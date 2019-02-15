"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const controllers_1 = require("../controllers");
class Routes {
    constructor() {
        this.userRoutes = new _1.UserRoutes();
        this.userController = new controllers_1.UserController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).json({ 'message': 'server is running' });
        });
        app.route('/api/login').post(this.userController.userLogin);
        app.route('/api/forgotPassword').post(this.userController.userForgotPassword);
        app.route('/api/resetPassword/:id').put(this.userController.userResetPassword);
        app.route('/user', this.userRoutes.routes(app));
    }
}
exports.Routes = Routes;
;
//# sourceMappingURL=routes.js.map