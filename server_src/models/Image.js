const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../connection/db');

const Image = new Schema({
    path: {type: String, required: true},
    description: {type: String, maxlength: 200},
    date: {type: Date}
});

module.exports = db.model('Image', Image);