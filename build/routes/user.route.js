"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("../controllers");
const services_1 = require("../services");
class UserRoutes {
    constructor() {
        this.userController = new controllers_1.UserController();
    }
    routes(app) {
        app.route('/user')
            //get all users
            .get(services_1.validateToken, this.userController.getUsers)
            //create new user
            .post(this.userController.addNewUser)
            // update a specific user
            .put(services_1.validateToken, this.userController.updateUser)
            // delete specific user
            .delete(services_1.validateToken, this.userController.deleteUser);
        app.route('/user/userdetails')
            //get specific user details
            .get(services_1.validateToken, this.userController.getUserWithId);
    }
}
exports.UserRoutes = UserRoutes;
;
//# sourceMappingURL=user.route.js.map