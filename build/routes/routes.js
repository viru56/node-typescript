"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const _1 = require("./");
const controllers_1 = require("../controllers");
const path = require("path");
class Routes {
    constructor() {
        this.userRoutes = new _1.UserRoutes();
        this.userController = new controllers_1.UserController();
    }
    routes(app) {
        app.route('/').get((req, res) => {
            res.sendFile(path.join(__dirname, "..", "..", "public", "index.html"));
        });
        app.route('/ping')
            .get((req, res) => {
            res.send('pong');
        });
        app.route('/api/login').post(this.userController.userLogin);
        app.route('/user', this.userRoutes.routes(app));
    }
}
exports.Routes = Routes;
;
