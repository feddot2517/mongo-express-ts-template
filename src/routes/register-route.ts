import express = require('express');
import { UserValidator } from '../validators/user-validator';
import { generateAccessToken } from '../utils/jwt';
import { User } from '../models/user';
import { passwordToHash } from '../utils/passwordToHash';

export function registerRoute(app: express.Application) {
    app.post('/api/register', async (req, res) => {
        try {
            const userData = UserValidator.validate(req.body);
            if (userData.error) return res.status(401).send(userData.error.details);

            const hasUser = !! await User.findOne({email: userData.value.email});

            if(hasUser) {
                return res.status(403).send();
            }

            const newUser = new User({
                ...userData.value,
                password: passwordToHash(userData.value.password),
            });
            await newUser.save();


            return res.status(200).send(
                generateAccessToken({
                    userId: newUser._id,
                    password: newUser.password,
                }),
            );
        } catch (e) {
            res.status(403).send(e);
        }
    });
}