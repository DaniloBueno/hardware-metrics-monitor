const express = require('express');
const http = require('http');

class HttpServer {
    constructor(port) {
        this._listeningPort = port;
        this._app = express();
        this._setupServer();
        this._setupControllers();
        this._server = {};
    }

    startServer() {
        this._server = http.createServer(this._app);
        this._server.listen(this._listeningPort);
        this._server.on('listening', () => {
            console.log(`App started on port ${this._listeningPort}`);
        });
    }

    _setupServer() {
        this._app.set('port', this._listeningPort);
    }

    _setupControllers() {
        this._app.use((request, response, next) => {
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            next();
        });
        this._app.use(require('./controllers/metrics-controller'));
    }
}

module.exports = HttpServer;
