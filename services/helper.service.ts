import * as crypto from 'crypto';
import { config } from '../config/config';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const expiresIn:number = 60*60*1000*24;

export const hashPassword = (password: string) => {
    if (password && password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
        return crypto.createHmac('sha256', config.secret).update(password).digest('hex');
    } else {
        return false;
    }
};

export const parseUser = (user: any) => {
    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email
    }
};

export const jwtToken = (payload) => {
    var data = {
        aud: payload.id,
        role: payload.role || 'user',
        iss: 'www.onestopyoga.com',
        type: payload.type || 'login',
        email: payload.email || 'Unknown'
    }
    return jwt.sign(data, config.secret, { expiresIn });
};

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                if (err.name = 'TokenExpiredError') {
                    return res.status(403).json({ message: 'Token is expired' });
                }
                return res.status(403).json({ message: 'Failed to authenticate token.' });
            } else {
                if(decoded.type !== 'login'){
                    return res.status(403).json({ message: 'Not a valid token' });
                }
                // if everything is good, save to request for use in other routes
                req.params.id = decoded.aud;
                req.params.email = decoded.email;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            message: 'No token provided.'
        });

    }
}
export const validateAdminToken = (req: Request, res: Response, next: NextFunction) => {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                if (err.name = 'TokenExpiredError') {
                    return res.status(403).json({ message: 'Token is expired' });
                }
                return res.status(403).json({ message: 'Failed to authenticate token.' });
            } else {
                if(decoded.role !== 'admin'){
                    return res.status(403).json({ message: 'Failed to authenticate token.' });
                }
                // if everything is good, save to request for use in other routes
                req.params.id = decoded.aud;
                req.params.email = decoded.email;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            message: 'No token provided.'
        });

    }
}
export const validateActivationToken = (req: Request, res: Response, next: NextFunction) => {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                if (err.name = 'TokenExpiredError') {
                    return res.status(403).json({ message: 'Token is expired' });
                }
                return res.status(403).json({ message: 'Failed to authenticate token.' });
            } else {
                if(decoded.type !== 'activation'){
                    return res.status(403).json({ message: 'not a valid token' });
                }
                // if everything is good, save to request for use in other routes
                req.params.id = decoded.aud;
                req.params.email = decoded.email;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            message: 'No token provided.'
        });

    }
}
export const validateForgotPasswordToken = (req: Request, res: Response, next: NextFunction) => {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                if (err.name = 'TokenExpiredError') {
                    return res.status(403).json({ message: 'Token is expired' });
                }
                return res.status(403).json({ message: 'Failed to authenticate token.' });
            } else {
                if(decoded.type !== 'forgot'){
                    return res.status(403).json({ message: 'not a valid token' });
                }
                // if everything is good, save to request for use in other routes
                req.params.id = decoded.aud;
                req.params.email = decoded.email;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            message: 'No token provided.'
        });

    }
}