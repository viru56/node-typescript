"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const http = require("http");
const config_1 = require("./config");
const services_1 = require("./services");
const init = () => {
    http.createServer(app_1.default).listen(config_1.default.httpPort, () => {
        services_1.logger.log('The HTTP server is running on port ' + config_1.default.httpPort + ' - ' + config_1.default.envName);
    });
};
init();
