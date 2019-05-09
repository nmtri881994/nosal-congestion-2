const mongoose = require('mongoose');
const config = require('../config/appConfigs');

const db = mongoose.createConnection(`mongodb://${config.database_ip}/${config.database_name}`, {
    useNewUrlParser: true
    // useMongoClient: true,
    /* other options */
  });

module.exports = db;