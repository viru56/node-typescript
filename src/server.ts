import app from './app';
import * as http from 'http';
import config from './config';
import { logger } from './services';

const init = () => {
    http.createServer(app).listen(config.httpPort, () => {
        logger.log('The HTTP server is running on port ' + config.httpPort + ' - ' + config.envName);
    });
};

init();
