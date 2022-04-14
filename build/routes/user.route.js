"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const controllers_1 = require("../controllers");
class UserRoutes {
    constructor() {
        this.userController = new controllers_1.UserController();
    }
    routes(app) {
        app.route('/user')
            //create new user
            .post(this.userController.addNewUser);
    }
}
exports.UserRoutes = UserRoutes;
;
