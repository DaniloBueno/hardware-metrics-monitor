const MongoClient = require('mongodb').MongoClient;
const config = require('../config/default.json');

class DatabaseFactory {
    async connect() {
        return (await MongoClient.connect(config.storage.url, {useUnifiedTopology: true})).db(config.storage.name);
    }
}

module.exports = new DatabaseFactory();
