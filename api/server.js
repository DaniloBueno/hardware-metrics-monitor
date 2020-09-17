const HttpServer = require('./http-server');
const config = require('./config/default.json');

new HttpServer(config.port).startServer();
