import { UserController } from '../controllers';

export class UserRoutes {
    public userController: UserController = new UserController();
    public routes(app): void {
        app.route('/user')
            //create new user
            .post(this.userController.addNewUser);
    }
};