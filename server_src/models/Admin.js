const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../connection/db');

const Admin = new Schema({
    name: { type: String },
    accountType: { type: String },
    accountID: { type: String }
});

module.exports = db.model('Admin', Admin);