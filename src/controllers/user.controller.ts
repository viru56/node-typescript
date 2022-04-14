import { User } from '../models';
import { Request, Response } from 'express';
import { parseUser, hashPassword, jwtToken, logger } from '../services';

export class UserController {
    async addNewUser(req: Request, res: Response) {
        logger.info('/user', 'post', 'addNewUser', req.body.email);
        logger.log('body', req.body);
        const newUser = new User(req.body);
        try {
            const userData =  await newUser.save();
            res.status(200).json({ user: userData });
        } catch (error) {
            res.status(400).json(error);
            logger.error('falied to create new user, reason:- ', error);
        }
    };

    async userLogin(req: Request, res: Response) {
        logger.info('/api/login', 'post', 'userLogin', req.body.email);
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            logger.error(`${req.body.email} - user not exist`);
            return res.status(400).json({ 'message': 'user not exists' });
        }
        if (hashPassword(req.body.password) !== user.password) {
            logger.error(`password did not match for ${user.email}`);
            return res.status(400).json({ message: 'password did not match' });
        }
        
        const token = jwtToken({ id: user._id, type: 'login', email: user.email });
        res.status(200).json({ token,email: user.email, firstName: user.firstName, lastName: user.lastName });
    };

};