const router = require('express').Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const config = require('../config/appConfigs');

const Post = require('../models/Post');
const Account = require('../models/Account');

const returnStatus = require('../properties/returnStatus');

router.get('/get-post-content-for-translating/:postID', (req, res) => {
    if (req.params.postID && req.params.postID !== "undefined") {
        Post.findById(req.params.postID)
            .then(post => {
                res.status(returnStatus.OK).json({
                    image: post.detail.image,
                    name: post.detail.name,
                    originalLanguage: post.detail.originalLanguage,
                    content: post.detail.content
                })
            })
            .catch(error => {
                console.log(error);
                res.status(returnStatus.INTERNAL_SERVER_ERROR).json({ error });
            })
    } else {
        res.status(returnStatus.BAD_REQUEST).json({});
    }

});

router.get('/get-post-by-id/:postID', (req, res) => {
    if (req.params.postID && req.params.postID !== "undefined") {
        Post.findById(req.params.postID)
            .then(post => {
                if (post) {
                    Account.findById(post.createdBy)
                        .then(account => {
                            post.createByUser = {
                                _id: account._id,
                                name: account.name,
                                avatar: account.avatar
                            };
                            res.status(returnStatus.OK).json({ createByUser: post.createByUser, ...post.toJSON() });
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(returnStatus.INTERNAL_SERVER_ERROR).json({ error });
                        })
                } else {
                    res.status(returnStatus.NOT_FOUND).json({});
                }


            })
            .catch(error => {
                console.log(error);
                res.status(returnStatus.INTERNAL_SERVER_ERROR).json({ error });
            })
    } else {
        res.status(returnStatus.BAD_REQUEST).json({});
    }

});

router.get('/view/:postID', (req, res) => {
    if (req.params.postID && req.params.postID !== "undefined") {
        const token = req.headers.authorization;
        Post.findById(req.params.postID)
            .then(async post => {
                if (token) {
                    const promise = new Promise(resolve => {
                        jwt.verify(token, config.secret, function (error, decoded) {
                            if (error) {
                                post.views.push({
                                    viewer: "anonymous",
                                    ip: req.header('x-forwarded-for') || req.connection.remoteAddress,
                                    time: new Date()
                                });
                                resolve();
                            } else {
                                Account.findById(decoded.data)
                                    .then(account => {
                                        post.views.push({
                                            viewer: account._id.toString(),
                                            ip: req.header('x-forwarded-for') || req.connection.remoteAddress,
                                            time: new Date()
                                        });
                                        resolve();
                                    })
                                    .catch(error => {
                                        res.status(returnStatus.INTERNAL_SERVER_ERROR).json({
                                            error
                                        })
                                    });

                            }
                        })
                    });
                    await promise;
                } else {
                    post.views.push({
                        viewer: "anonymous",
                        ip: req.header('x-forwarded-for') || req.connection.remoteAddress,
                        time: new Date()
                    });
                };

                post.save()
                    .then(savedPost => {
                        res.status(returnStatus.OK).json(null);
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(returnStatus.INTERNAL_SERVER_ERROR).json({ error });
                    })
            })
            .catch(error => {
                console.log(error);
                res.status(returnStatus.INTERNAL_SERVER_ERROR).json({ error });
            })
    } else {
        res.status(returnStatus.BAD_REQUEST).json({});
    }
})

router.get("/test", async (req, res) => {
    try {
        let posts = await Post.aggregate([
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
                $limit: 10
            }
        ]);

        posts = posts.map(post => {
            post.createdByUser = post.createdByUser[0];
            return post;
        })

        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(returnStatus.INTERNAL_SERVER_ERROR).json({});
    }

});

router.get("/object-id", (req, res) => {
    Post.find({
        'createdBy': { $type: "string" }
    })
        .then(posts => {
            // posts.forEach(post => {
            //     post.createdBy = mongoose.Types.ObjectId(post.createdBy);
            //     post.save()
            // });
            res.status(returnStatus.OK).json(posts.length);
        })
        .catch(error => {
            console.log(error);
            res.status(returnStatus.INTERNAL_SERVER_ERROR).json({});
        })
});

router.get("/update-text-item-structure", (req, res) => {
    Post.find({
    })
        .then(posts => {
            // posts.forEach(post => {
            //     post.createdBy = mongoose.Types.ObjectId(post.createdBy);
            //     post.save()
            // });
            posts = posts.map(async post => {
                post.detail.content = post.detail.content.map(contentItem => {
                    if (['h1', 'h2', 'h3', 'paragraph'].indexOf(contentItem.type) !== -1) {
                        contentItem.content.parsedText = contentItem.content.parsedText.map(textItem => {
                            if (textItem.text["en"] && typeof textItem.text["en"] !== "object") {
                                textItem.text["en"] = {
                                    text: textItem.text["en"],
                                    linked: false
                                }
                            }
                            if (textItem.text["vi"] && typeof textItem.text["vi"] !== "object") {
                                textItem.text["vi"] = {
                                    text: textItem.text["vi"],
                                    linked: false
                                }
                            }


                            return textItem;
                        })
                    }


                    return contentItem;
                });

                post.markModified('detail.content');
                post.save();
                return post;
            })

            res.status(returnStatus.OK).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(returnStatus.INTERNAL_SERVER_ERROR).json({});
        })
});

router.get("/update-name-text-item-structure", (res, req) => {
    Post.find({})
        .then(async posts => {
            const promises = posts.map(async post => {
                post.detail.name.parsedText = post.detail.name.parsedText.map(textItem => {
                    if (textItem.text["en"] && typeof textItem.text["en"] !== "object") {
                        textItem.text["en"] = {
                            text: textItem.text["en"],
                            linked: false
                        }
                    }
                    if (textItem.text["vi"] && typeof textItem.text["vi"] !== "object") {
                        textItem.text["vi"] = {
                            text: textItem.text["vi"],
                            linked: false
                        }
                    }


                    return textItem;
                });

                post.markModified('detail.name.parsedText');
                const savedPost = await post.save();
                console.log(1);
                return savedPost;
            });

            console.log(2);
            const results = await Promise.all(promises);
            console.log(3);

            res.status(returnStatus.OK).json(results);
        })
        .catch(error => {
            console.log(error);
            res.status(returnStatus.INTERNAL_SERVER_ERROR).json({});
        })
})

module.exports = router;