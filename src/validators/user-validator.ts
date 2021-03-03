const Joi = require('joi');

const reqStr = Joi.string().required();

export const UserValidator = Joi.object({
    email: reqStr,
    password: reqStr,
})