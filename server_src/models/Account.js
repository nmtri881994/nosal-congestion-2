const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../connection/db');

const Account = new Schema({
    username: { type:String },
    name: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number },
    email: { type: String },
    role: { type: String },
    accountType: { type: String, required: true },
    accessToken: { type: String, required: true },
    accountId: { type: String, required: true },
    avatar: { type: String }
});

module.exports = db.model('Account', Account);