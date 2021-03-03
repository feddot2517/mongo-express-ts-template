import express = require('express');
import { UserValidator } from '../validators/user-validator';
import { authenticateMiddleware, generateAccessToken } from '../utils/jwt';
import { User } from '../models/user';
import { passwordToHash } from '../utils/passwordToHash';

export function loginRoute(app: express.Application) {
    app.post('/api/login', async (req, res) => {
        try {
            const userData = UserValidator.validate(req.body);
            if (userData.error) res.status(401).send(userData.error.details);

            const user = await User.findOne({
                email: userData.value.phone,
                password: passwordToHash(userData.value.password),
            });
            if (!user) {
                return res.status(403).send('Неправильный логин или пароль');
            } else {
                return res.status(200).send(
                    generateAccessToken({
                        userId: user._id,
                        password: user.password,
                    }),
                );
            }
        } catch (e) {
            res.status(403).send(e);
        }
    });
}