import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import { Routes } from './routes';
import config from './config';
import { logger } from './services';
import * as path from 'path';
import helmet from "helmet";
import rateLimit from 'express-rate-limit'

class App {
    public app: express.Application;
    public routes: Routes = new Routes();
    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
        this.routes.routes(this.app);
    }
    config(): void {
        //support application/json type post data
        this.app.use(bodyParser.json());
        this.app.use(express.static(path.join(__dirname, "../public")));
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(helmet());
        const limiter = rateLimit({
            windowMs: 1 * 60 * 1000, // 1 minutes
            max: 250, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
            standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
            legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        });
        this.app.use(limiter)
    }
    async mongoSetup(): Promise<void> {
        try {
            await mongoose.connect(config.mongoUrl, { useNewUrlParser: true });
            logger.log("connected to mongodb...:)");
        } catch (err) {
            logger.error("failed to connect to mongodb", err);
        }
    }

}

export default new App().app;