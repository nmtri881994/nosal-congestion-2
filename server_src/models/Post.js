const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../connection/db');
const PostDetail = require('./utility_class/PostDetail');

const Post = new Schema({
    createdBy: { type: Schema.ObjectId, require: true },
    lastUpdateBy: { type: String, require: true },
    createDate: { type: Date, require: true },
    lastUpdateDate: { type: Date, require: true },
    detail: {},
    views: [],
    availableLanguages: [],
});

module.exports = db.model('Post', Post);