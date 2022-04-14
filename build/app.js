"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes_1 = require("./routes");
const config_1 = require("./config");
const services_1 = require("./services");
const path = require("path");
const express_rate_limit_1 = require("express-rate-limit");
class App {
    constructor() {
        this.routes = new routes_1.Routes();
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routes.routes(this.app);
    }
    config() {
        //support application/json type post data
        this.app.use(bodyParser.json());
        this.app.use(express.static(path.join(__dirname, "../public")));
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        //this.app.use(helmet());
        const limiter = (0, express_rate_limit_1.default)({
            windowMs: 1 * 60 * 1000,
            max: 250,
            standardHeaders: false,
            legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        });
        // this.app.use(limiter)
    }
    mongoSetup() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose.connect(config_1.default.mongoUrl, { useNewUrlParser: true });
                services_1.logger.log("connected to mongodb...:)");
            }
            catch (err) {
                services_1.logger.error("failed to connect to mongodb", err);
            }
        });
    }
}
exports.default = new App().app;
