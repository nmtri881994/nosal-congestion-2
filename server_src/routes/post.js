const router = require('express').Router();

const Post = require('../models/Post');

const returnStatus = require('../properties/returnStatus');

router.get('/get-post-content-for-translating/:postID', (req, res) => {
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
});

module.exports = router;