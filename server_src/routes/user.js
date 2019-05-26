const router = require('express').Router();
const fs = require('fs');
const uniqid = require('uniqid');

const Post = require('../models/Post');
const PostDetail = require('../models/utility_class/PostDetail');
const PostDetailItemText = require('../models/utility_class/PostDetailItemText');
const userAuthorizationMiddleware = require('./middlewares/authorizeUserMiddleware');

const returnStatus = require('../properties/returnStatus');

router.use(userAuthorizationMiddleware);

function parseTextItemContent(text, language) {
    const parsedTextArray = text.match(/[^\.!\?]+[\.!\?]+/g);
    if (parsedTextArray) {
        return parsedTextArray.map(parsedText => new PostDetailItemText(parsedText, language));
    } else {
        return [new PostDetailItemText(text, language)];
    }
}

function saveImageAsFile(imageData, res) {
    return new Promise(resolve => {
        const base64Data = imageData.split(";base64,");
        const fileName = `/images/${new Date().toLocaleDateString().replace(/\//g, "-")}-${uniqid()}.jpg`;
        fs.writeFile(`static/public${fileName}`, base64Data[1], 'base64', function (error) {
            if (error) {
                console.log(error);
                res.status(returnStatus.INTERNAL_SERVER_ERROR).json({ error });
            } else {
                resolve(fileName);
            }
        })
    })

}

function parseItem(content) {
    return new Promise(resolve => {
        let newConetent = content.slice(0);
        newConetent.map(async item => {
            if (item.type !== "image") {
                item.content.parsedText = parseTextItemContent(item.content.text);
            }

            if (item.type === "image") {
                item.content.dataUrl = await saveImageAsFile(item.content.dataUrl);
            }
            return item;
        })
        resolve(newConetent);
    });
}


router.post('/create-post', (req, res) => {

    if (req.body.postDetail) {

        async function handleRequest(req, res) {
            let postDetail = new PostDetail(req.body.postDetail);
            // const promise1 = Object.defineProperty(postDetail.name, postDetail.originalLanguage, {
            //     value: req.body.postDetail.name,
            //     writable: true
            // });

            // Promise(promise1);

            if (postDetail.image && postDetail.image.dataUrl !== "") {
                postDetail.image.dataUrl = await saveImageAsFile(postDetail.image.dataUrl, res);
            }

            // postDetail.content = await parseItem(postDetail.content);
            postDetail.name.parsedText = parseTextItemContent(postDetail.name.text, postDetail.originalLanguage);

            const promises = postDetail.content.map(async item => {
                if (['h1', 'h2', 'h3', 'paragraph', 'note'].indexOf(item.type) !== -1) {
                    item.content.parsedText = parseTextItemContent(item.content.text, postDetail.originalLanguage);
                }

                if (item.type === "image") {
                    item.content.dataUrl = await saveImageAsFile(item.content.dataUrl);
                }

                return item;
            })

            const results = await Promise.all(promises);
            postDetail.content = results;
            const createTime = new Date();

            const post = new Post({
                createdBy: req.userId,
                lastUpdateBy: req.userId,
                createDate: createTime,
                lastUpdateDate: createTime,
                detail: postDetail,
                availableLanguages: [req.body.postDetail.originalLanguage]
            });

            post.save()
                .then(savedPost => {
                    console.log(savedPost.detail.content[0]);
                    res.status(returnStatus.OK).json({ post, postDetail });
                })
                .catch(error => {
                    console.log(error);
                    res.status(returnStatus.INTERNAL_SERVER_ERROR).json({ error });
                })
        };
        handleRequest(req, res);
    } else {
        res.status(returnStatus.BAD_REQUEST).json({});
    }
});


router.post("/create-language-version-for-post/:postID", (req, res) => {
    const translatedPost = req.body.post;
    const targetLanguage = req.body.targetLanguage;

    // console.log(req.body.post);
    // console.log(targetLanguage);
    if (translatedPost && targetLanguage) {
        Post.findById(req.params.postID)
            .then(post => {
                if (post.createdBy == req.userId) {
                    translatedPost.name.parsedText.map(translatedTextItem => {
                        if (translatedTextItem.text[targetLanguage]) {
                            post.detail.name.parsedText = post.detail.name.parsedText.map(textItem => {
                                if (textItem.id === translatedTextItem.id) {
                                    if (textItem.text[targetLanguage]) {
                                        textItem.text[targetLanguage] = translatedTextItem.text[targetLanguage];
                                    } else {
                                        Object.defineProperty(textItem.text, targetLanguage, {
                                            value: translatedTextItem.text[targetLanguage],
                                            writable: true,
                                            enumerable: true
                                        })
                                    }
                                }
                                return textItem;
                            })
                        }
                    });

                    translatedPost.content.map(translatedContentItem => {
                        if (["h1", "h2", "h3", "paragraph", "note"].indexOf(translatedContentItem.type) !== -1) {
                            translatedContentItem.content.parsedText.map(translatedTextItem => {
                                if (translatedTextItem.text[targetLanguage]) {
                                    post.detail.content = post.detail.content.map(contentItem => {
                                        if (translatedContentItem.id === contentItem.id) {
                                            contentItem.content.parsedText = contentItem.content.parsedText.map(textItem => {
                                                if (textItem.id === translatedTextItem.id) {
                                                    if (textItem.text[targetLanguage]) {
                                                        textItem.text[targetLanguage] = translatedTextItem.text[targetLanguage];
                                                    } else {
                                                        Object.defineProperty(textItem.text, targetLanguage, {
                                                            value: translatedTextItem.text[targetLanguage],
                                                            writable: true,
                                                            enumerable: true
                                                        })
                                                    }
                                                }
                                                return textItem;
                                            })
                                        };

                                        return contentItem;
                                    });
                                };
                            })
                        }
                    });

                    post.lastUpdateBy = req.userId;
                    post.lastUpdateDate = new Date();

                    if (post.availableLanguages.indexOf(targetLanguage) === -1) {
                        post.availableLanguages.push(targetLanguage);
                    }

                    post.markModified('detail.name.parsedText');
                    post.markModified('detail.content');

                    post.save()
                        .then(savedPost => {
                            res.status(returnStatus.OK).json({});
                        })
                        .catch(error => {
                            console.log(error);
                            res.status(returnStatus.INTERNAL_SERVER_ERROR).json({});
                        })
                } else {
                    res.status(returnStatus.UNAUTHORIZED).json({});
                }

            })
            .catch(error => {
                console.log(error);
                res.status(returnStatus.INTERNAL_SERVER_ERROR).json({});
            })
    } else {
        res.status(returnStatus.BAD_REQUEST).json({});
    }
})


module.exports = router;