import { Request, Response } from 'express';
import { UserRoutes } from './';
import { UserController } from '../controllers';

export class Routes {
    private userRoutes: UserRoutes = new UserRoutes();
    private userController: UserController = new UserController();
    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).json({ 'message': 'server is running' });
            });
        app.route('/api/login').post(this.userController.userLogin);
        app.route('/api/forgotPassword').post(this.userController.sendForgotPasswordMail);
        app.route('/user', this.userRoutes.routes(app));
    }
};