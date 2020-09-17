const express = require('express');
const router = express.Router();
const config = require('../config/default.json');
const MetricsService = require('../services/metrics-service');

class MetricsController {

    constructor() {
        router.get('/metrics', this._handleGetMetrics);
    }

    async _handleGetMetrics(request, response) {
        try {
            const interval = request.query.interval ? request.query.interval : config.interval.default;
            console.log(`Getting metrics for the last ${interval} hour(s)`);
            const metrics = await MetricsService.getMetrics(interval);
            response.status(200).send(metrics);
        } catch (error) {
            console.log(`Error getting metrics: ${error}`);
            response.status(500).send();
        }
    }
}

new MetricsController();
module.exports = router;
