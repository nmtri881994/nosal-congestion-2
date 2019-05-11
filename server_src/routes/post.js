const router = require('express').Router();

const Post = require('../models/Post');
const Account = require('../models/Account');

const returnStatus = require('../properties/returnStatus');

router.get('/get-post-content-for-translating/:postID', (req, res) => {
    if (req.params.postID) {
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
    if (req.params.postID) {
        Post.findById(req.params.postID)
            .then(post => {
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

            })
            .catch(error => {
                console.log(error);
                res.status(returnStatus.INTERNAL_SERVER_ERROR).json({ error });
            })
    } else {
        res.status(returnStatus.BAD_REQUEST).json({});
    }

})

module.exports = router;