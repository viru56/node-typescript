import app from './app';
import * as https from 'https';
import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import * as os  from 'os'
import * as cluster from 'cluster';
import {config} from './config/config';
import {logger} from './services';
// const httpsOptions = {
//     key: fs.readFileSync(path.join(__dirname + '/config/' + 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname + '/config/' + 'cert.pem'))
// };

const init = () => {
    http.createServer(app).listen(config.httpPort, () => {
        logger.log('The HTTP server is running on port ' + config.httpPort + ' - ' +config.envName);
    });
    // https.createServer(httpsOptions, app).listen(config.httpsPort, () => {
    //     console.log('\x1b[36m%s\x1b[0m', 'The HTTPS server is running on port ' + config.httpsPort + ' - ' +config.envName);
    // });
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
