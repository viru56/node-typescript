"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const models_1 = require("../models");
const services_1 = require("../services");
class UserController {
    addNewUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            services_1.logger.info('/user', 'post', 'addNewUser', req.body.email);
            services_1.logger.log('body', req.body);
            const newUser = new models_1.User(req.body);
            try {
                const userData = yield newUser.save();
                res.status(200).json({ user: userData });
            }
            catch (error) {
                res.status(400).json(error);
                services_1.logger.error('falied to create new user, reason:- ', error);
            }
        });
    }
    ;
    userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            services_1.logger.info('/api/login', 'post', 'userLogin', req.body.email);
            const user = yield models_1.User.findOne({ email: req.body.email });
            if (!user) {
                services_1.logger.error(`${req.body.email} - user not exist`);
                return res.status(400).json({ 'message': 'user not exists' });
            }
            if ((0, services_1.hashPassword)(req.body.password) !== user.password) {
                services_1.logger.error(`password did not match for ${user.email}`);
                return res.status(400).json({ message: 'password did not match' });
            }
            const token = (0, services_1.jwtToken)({ id: user._id, type: 'login', email: user.email });
            res.status(200).json({ token, email: user.email, firstName: user.firstName, lastName: user.lastName });
        });
    }
    ;
}
exports.UserController = UserController;
;
