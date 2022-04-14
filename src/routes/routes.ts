import { Request, Response } from 'express';
import { UserRoutes } from './';
import { UserController } from '../controllers';
import * as path from 'path';

export class Routes {
    private userRoutes: UserRoutes = new UserRoutes();
    private userController: UserController = new UserController();
    public routes(app): void {
        app.route('/').get((req: Request, res: Response) => {
            res.sendFile(path.join(__dirname, "..","..", "public", "index.html"));
        })
        app.route('/ping')
            .get((req: Request, res: Response) => {
                res.send('pong');
            });
        app.route('/api/login').post(this.userController.userLogin);
        app.route('/user', this.userRoutes.routes(app));
    }
};