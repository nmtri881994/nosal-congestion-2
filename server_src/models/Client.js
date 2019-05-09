const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../connection/db');

const Client = new Schema({
    account: {}
});

module.exports = db.model('Client', Client);