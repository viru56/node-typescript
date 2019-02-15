"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");
const config_1 = require("./config/config");
const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname + '/config/' + 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname + '/config/' + 'cert.pem'))
};
const init = () => {
    http.createServer(app_1.default).listen(config_1.config.httpPort, () => {
        console.log('\x1b[36m%s\x1b[0m', 'The HTTP server is running on port ' + config_1.config.httpPort + ' - ' + config_1.config.envName);
    });
    https.createServer(httpsOptions, app_1.default).listen(config_1.config.httpsPort, () => {
        console.log('\x1b[36m%s\x1b[0m', 'The HTTPS server is running on port ' + config_1.config.httpsPort + ' - ' + config_1.config.envName);
    });
};
// if (cluster.isMaster) {
//     // Fork workers.
//     for (let i = 0; i < os.cpus().length; i++) {
//         cluster.fork();
//     }
//     cluster.on('exit', (worker, code, signal) => {
//         console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
//         console.log('starting a new cluster');
//         cluster.fork();
//     });
// } else {
//     //start the sever
//     init();
// };
init();
// app.listen(PORT, () => {
//     console.log("\x1b[32m%s\x1b[0m", 'server is listening on prot: '+ httpPort);
// });
//# sourceMappingURL=server.js.map