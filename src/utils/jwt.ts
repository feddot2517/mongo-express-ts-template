import { ACCESS_TOKEN_SECRET } from '../config/config'
const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

export function authenticateMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err: any, params: any) => {
        if (err) return res.sendStatus(403);
        req.params = params;
        next()
    })
}

export function generateAccessToken(params: any) {
    return jwt.sign(params, ACCESS_TOKEN_SECRET, {expiresIn: '30d'})
}