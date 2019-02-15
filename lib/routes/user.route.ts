import { UserController } from '../controllers';
import { validateToken ,validateActivationToken,validateForgotPasswordToken} from '../services';
export class UserRoutes {
    public userController: UserController = new UserController();
    public routes(app): void {
        app.route('/user')
            //get all users
            .get(validateToken, this.userController.getUsers)
            //create new user
            .post(this.userController.addNewUser)
            // update a specific user
            .put(validateToken, this.userController.updateUser)
            // delete specific user
            .delete(validateToken, this.userController.deleteUser);
        app.route('/user/userdetails')
            //get specific user details
            .get(validateToken, this.userController.getUser);
        app.route('/user/forgotPassword').put(validateForgotPasswordToken,this.userController.userForgotPassword);
        app.route('/user/resetPassword').put(validateToken,this.userController.userResetPassword);
        app.route('/user/accountActivation').put(validateActivationToken,this.userController.accountActivation);
    }
};