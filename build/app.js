"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes_1 = require("./routes");
const config_1 = require("./config/config");
class App {
    constructor() {
        this.routes = new routes_1.Routes();
        //public mongoUrl: string = 'mongodb://localhost:27017/yoga';
        this.mongoUrl = config_1.config.mongoUrl;
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routes.routes(this.app);
    }
    config() {
        //support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true }, (err) => {
            if (err) {
                console.log("\x1b[33m%s\x1b[0m", "failed to connect to server:- ", this.mongoUrl);
            }
            else {
                console.log("\x1b[32m%s\x1b[0m", "connected to mongodb...:)");
            }
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map