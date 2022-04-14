"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston = require("winston");
const loggerWinston = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'info.log'
        })
    ]
});
if (process.env.NODE_ENV !== 'production') {
    loggerWinston.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}
exports.logger = {
    info: (path, method, controllerName, email) => loggerWinston.info(`${path}, ${method}, ${controllerName}, ${email},${new Date()}`),
    log: (message, data) => {
        if (data) {
            loggerWinston.info({ message, data, Date: new Date() });
        }
        else {
            loggerWinston.info(`${message}- ${new Date()}`);
        }
    },
    error: (message, err) => {
        if (err) {
            loggerWinston.error({ message, Date: new Date(), err });
        }
        else {
            loggerWinston.error(`${message}- ${new Date()}`);
        }
    }
};
