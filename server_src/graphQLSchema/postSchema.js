const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    input,
    GraphQLNonNull
} = require('graphql');
const jwt = require('jsonwebtoken');

const Post = require('../models/Post');
const Account = require('../models/Account');

const config = require('../config/appConfigs');

const ImageType = new GraphQLObjectType({
    name: 'Image',
    fields: () => ({
        id: { type: GraphQLString },
        dataUrl: { type: GraphQLString },
        width: { type: GraphQLInt },
        height: { type: GraphQLInt },
    })
});

const ContentItemType = new GraphQLObjectType({
    name: 'ContentItem',
    fields: () => ({
        id: { type: GraphQLString }
    })
});

const NameType = new GraphQLObjectType({
    name: 'Name',
    fields: () => ({
        language: { type: GraphQLString },
        meaning: { type: GraphQLString }
    })
});

const DetailType = new GraphQLObjectType({
    name: 'Detail',
    fields: () => ({
        // name: { type: new GraphQLList(NameType) },
        image: { type: ImageType },
        source: { type: GraphQLString },
        type: { type: new GraphQLList(GraphQLString) },
        originalLanguage: { type: GraphQLString },
        originalName: { type: GraphQLString }
        // ,content: { type: new GraphQLList(ContentItemType) },
    })
});

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        _id: { type: GraphQLString },
        createdBy: { type: GraphQLString },
        lastUpdateBy: { type: GraphQLString },
        createDate: { type: GraphQLString },
        lastUpdateDate: { type: GraphQLString },
        detail: { type: DetailType },
        views: { type: new GraphQLList(ContentItemType) },
        numberOfViews: { type: GraphQLInt },
        availableLanguages: { type: new GraphQLList(GraphQLString) }
    })
});

const PostsOfUserResultType = new GraphQLObjectType({
    name: 'PostsOfUserResult',
    fields: () => ({
        posts: { type: new GraphQLList(PostType) },
        numberOfPages: { type: GraphQLInt }
    })
});

const FieldSortType = new GraphQLInputObjectType({
    name: 'FieldSort',
    fields: () => ({
        field: { type: GraphQLString },
        desc: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        postsOfUser: {
            type: PostsOfUserResultType,
            args: {
                systemAccessToken: { type: GraphQLString },
                skip: { type: GraphQLInt },
                limit: { type: GraphQLInt },
                sortBy: { type: GraphQLString }
            },
            resolve(parentValue, args) {

                if (args.systemAccessToken) {
                    return jwt.verify(args.systemAccessToken, config.secret, async function (err, decoded) {
                        if (err) {
                            return null;
                        } else {
                            // let sortByMongoObject = {};
                            // args.sortBy.map(sort => {
                            //     const temp1 = `detail.${sort.field}`;
                            //     sort.temp1 = sort.desc
                            // });

                            // let sortByMongoString = `{"${args.sortBy.field}": ${args.sortBy.desc}}`;

                            const account = await Account.findById(decoded.data);

                            const posts = await Post.find({
                                $and: [
                                    { 'createdBy': account._id }
                                ]

                            })
                                .sort(JSON.parse(args.sortBy))
                                .skip(args.skip)
                                .limit(args.limit);

                            const numberOfTotalRecords = await Post.find({
                                $and: [
                                    { 'createdBy': account._id }
                                ]
                            })
                                .countDocuments();

                            const promises = posts.map(post => {
                                post.numberOfViews = post.views.length;
                                post.detail.originalName = post.detail.name.text;
                                // const timeTemp = post.createDate.toLocaleDateString();
                                // post.detail.createDate1 = timeTemp;
                                // console.log(timeTemp);
                                // console.log(post);
                                return post;
                            });
                            const result = await Promise.all(promises);
                            return {
                                posts: result,
                                numberOfPages: Math.ceil(numberOfTotalRecords / args.limit)
                            };
                        }
                    })
                } else {
                    return null;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});