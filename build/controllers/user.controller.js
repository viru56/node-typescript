"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const services_1 = require("../services");
class UserController {
    addNewUser(req, res) {
        const newUser = new models_1.User(req.body);
        if (services_1.hashPassword(newUser.password)) {
            newUser.save((err, user) => {
                if (err) {
                    res.status(400).json(err);
                }
                else {
                    res.status(200).json(services_1.parseUser(user));
                }
            });
        }
        else {
            res.status(400).json({ message: 'Password should have minimum eight characters, at least one letter and one number' });
        }
    }
    ;
    getUsers(req, res) {
        models_1.User.find({}, { firstName: 1, lastName: 1, phone: 1, email: 1 }, (err, users) => {
            if (err) {
                res.status(400).json(err);
            }
            else {
                res.status(200).json(users);
            }
        });
    }
    ;
    getUserWithId(req, res) {
        models_1.User.findById(req.params.id, { firstName: 1, lastName: 1, phone: 1, email: 1 }, (err, user) => {
            if (err) {
                res.status(400).json(err);
            }
            else {
                res.status(200).json(user);
            }
        });
    }
    ;
    updateUser(req, res) {
        models_1.User.findById(req.params.id, (err, user) => {
            if (err) {
                res.status(400).json(err);
            }
            else {
                if (req.body.firstName) {
                    user.firstName = req.body.firstName;
                }
                if (req.body.lastName) {
                    user.lastName = req.body.lastName;
                }
                if (req.body.phone) {
                    user.phone = req.body.phone;
                }
                if (req.body.email) {
                    user.lastName = req.body.email;
                }
                user.save((err, user) => {
                    if (err) {
                        res.status(400).json(err);
                    }
                    else {
                        res.status(200).json(services_1.parseUser(user));
                    }
                });
            }
        });
    }
    ;
    deleteUser(req, res) {
        models_1.User.deleteOne({ _id: req.params.id }, (err, user) => {
            if (err) {
                res.status(400).json(err);
            }
            else {
                res.status(200).json({ message: `user deleted - ${user.n}` });
            }
        });
    }
    ;
    userLogin(req, res) {
        if (req.body.email && req.body.password) {
            models_1.User.findOne({ email: req.body.email, isDeleted: false }, (err, user) => {
                if (!err && user) {
                    // if(user.status !== "Active"){
                    //     res.status(400).json({message:"your account is not active"});
                    // }
                    if (services_1.hashPassword(req.body.password) !== user.password) {
                        res.status(400).json({ message: 'password did not match' });
                    }
                    else {
                        const token = services_1.jwtAdminToken({
                            id: user._id,
                            email: user.email
                        });
                        res.status(200).json({ user: services_1.parseUser(user), token });
                    }
                }
                else {
                    res.status(400).json(err);
                }
            });
        }
        else {
            res.status(400).json({ message: 'missing required fields' });
        }
    }
    ;
    userForgotPassword(req, res) {
        models_1.User.findOne({ email: req.body.email, isDeleted: false }, (err, user) => {
            if (err) {
                res.json(400).json(err);
            }
            else {
                // send mail
                res.status(200).json({ message: 'Reset password email is sent' });
            }
        });
    }
    ;
    userResetPassword(req, res) {
        models_1.User.findById(req.params.id, (err, user) => {
            if (err) {
                res.status(400).json(err);
            }
            else if (!user) {
                res.status(400).json({ message: "user does not exists" });
            }
            else {
                if (services_1.hashPassword(req.body.password) !== user.password) {
                    res.status(400).json({ message: 'password did not match' });
                }
                else {
                    user.password = req.body.newPassword;
                    user.save((err, updatedUser) => {
                        if (err) {
                            res.status(400).json(err);
                        }
                        else {
                            res.status(200).json({ "message": 'password updated' });
                        }
                    });
                }
            }
        });
    }
    ;
}
exports.UserController = UserController;
;
//# sourceMappingURL=user.controller.js.map