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

const DetailType = new GraphQLObjectType({
    name: 'Detail',
    fields: () => ({
        // name: { type: new GraphQLList(NameType) },
        image: { type: ImageType },
        source: { type: GraphQLString },
        type: { type: new GraphQLList(GraphQLString) },
        originalLanguage: { type: GraphQLString },
        originalName: { type: GraphQLString },
        nameByLang: { type: GraphQLString },
        contentByLang: { type: GraphQLString }
        // ,content: { type: new GraphQLList(ContentItemType) },
    })
});

const CreatedByUserType = new GraphQLObjectType({
    name: 'CreateByUser',
    fields: () => ({
        name: { type: GraphQLString }
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        _id: { type: GraphQLString },
        createdBy: { type: GraphQLString },
        createdByUser: { type: CreatedByUserType },
        createdByUserName: { type: GraphQLString },
        lastUpdateBy: { type: GraphQLString },
        createDate: { type: GraphQLString },
        lastUpdateDate: { type: GraphQLString },
        detail: { type: DetailType },
        views: { type: new GraphQLList(ContentItemType) },
        numberOfViews: { type: GraphQLInt },
        availableLanguages: { type: new GraphQLList(GraphQLString) }
    })
});

const PostsResultType = new GraphQLObjectType({
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
            type: PostsResultType,
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
        },
        postByTypeAndLang: {
            type: PostsResultType,
            args: {
                skip: { type: GraphQLInt },
                limit: { type: GraphQLInt },
                sortBy: { type: GraphQLString },
                type: { type: new GraphQLList(GraphQLString) },
                lang: { type: new GraphQLList(GraphQLString) }
            },
            resolve(parentValue, args) {
                async function getPosts() {

                    let posts = await Post.aggregate([
                        {
                            $match: {
                                $and: [
                                    { 'availableLanguages': { $in: args.lang } },
                                    { 'detail.type': { $in: args.type, $nin: ["private"] } }
                                ]
                            }
                        },
                        {
                            $project: {
                                '_id': 1,
                                'createdBy': 1,
                                'createDate': 1,
                                'detail': 1,
                                'views': 1,
                                "viewsLength": { $size: "$views" }
                            }
                        },
                        {
                            $sort: {
                                'viewsLength': -1,
                                "createDate": -1
                            }
                        },
                        {
                            $skip: args.skip
                        },
                        {
                            $limit: args.limit
                        }
                    ]);


                    const result = posts.map(post => {
                        post.numberOfViews = post.views.length;
                        post.detail.originalName = post.detail.name.text;

                        post.detail.nameByLang = getNameByLang(post.detail.name.parsedText, args.lang, post.detail.originalLanguage);
                        return post;
                    });

                    return {
                        posts: result
                    };
                }

                return getPosts();
            }
        },
        postByTypeAndLang2: {
            type: PostsResultType,
            args: {
                skip: { type: GraphQLInt },
                limit: { type: GraphQLInt },
                sortBy: { type: GraphQLString },
                type: { type: new GraphQLList(GraphQLString) },
                lang: { type: new GraphQLList(GraphQLString) }
            },
            resolve(parentValue, args) {
                async function getPosts() {

                    let posts = await Post.aggregate([
                        {
                            $match: {
                                $and: [
                                    { 'availableLanguages': { $in: args.lang } },
                                    { 'detail.type': { $in: args.type, $nin: ["private"] } }
                                ]
                            }
                        },
                        {
                            $lookup: {
                                from: 'accounts',
                                localField: 'createdBy',
                                foreignField: '_id',
                                as: 'createdByUser'
                            }
                        },

                        {
                            $sort: {
                                'createDate': -1
                            }
                        },
                        {
                            $limit: args.limit
                        }
                    ])

                    posts = posts.map(post => {
                        post.numberOfViews = post.views.length;
                        post.detail.originalName = post.detail.name.text;

                        post.detail.nameByLang = getNameByLang(post.detail.name.parsedText, args.lang, post.detail.originalLanguage);
                        post.detail.contentByLang = getContentByLang(post.detail.content, args.lang, post.detail.originalLanguage);
                        post.createdByUser = post.createdByUser[0];
                        return post;
                    });

                    return {
                        posts: posts
                    };
                }

                return getPosts();
            }
        }
    }
});

function getNameByLang(nameParsedText, targetLang, originalLang) {
    let postNameByLang = "";

    nameParsedText.every((textItem, index) => {
        if (textItem.text[targetLang] && textItem.text[targetLang].text) {
            postNameByLang = postNameByLang.concat(textItem.text[targetLang].text);
        } else {
            postNameByLang = postNameByLang.concat(textItem.text[originalLang].text);
        };

        if (postNameByLang.length >= 35) {
            postNameByLang = postNameByLang.concat("...");
            return false;
        } else {
            return true;
        }
    });
    return postNameByLang;
};

function getContentByLang(content, targetLang, originalLang) {
    let contentByLang = "";

    content.every((contentItem, index) => {
        if (['h1', 'h2', 'h3', 'paragraph'].indexOf(contentItem.type) !== -1) {
            contentItem.content.parsedText.every((textItem, index) => {

                if (textItem.text[targetLang]&&textItem.text[targetLang].text) {
                    contentByLang = contentByLang.concat(textItem.text[targetLang].text);
                } else {
                    contentByLang = contentByLang.concat(textItem.text[originalLang].text);
                };

                if (contentByLang.length >= 100) {
                    contentByLang = contentByLang.concat("...");
                    return false;
                } else {
                    return true;
                }
            });

            return false;
        }

    });

    return contentByLang;
}

module.exports = new GraphQLSchema({
    query: RootQuery
});