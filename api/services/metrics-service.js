const moment = require('moment');
const config = require('../config/default.json');
const DatabaseFactory = require('../storage/database-factory');

class MetricsService {

    async getMetrics(interval) {
        const dbs = await DatabaseFactory.connect();
        const collection = dbs.collection(config.storage.collection);

        const metrics = await collection.find({
            $and: [{
                date: {
                    $gte: moment().subtract(interval, config.interval.unit).toDate()
                }
            }, {
                date: {
                    $lte: moment().toDate()
                }
            }]
        }).toArray();

        console.log(`Found ${metrics.length} metrics`);
        return metrics;
    }
}

module.exports = new MetricsService();
