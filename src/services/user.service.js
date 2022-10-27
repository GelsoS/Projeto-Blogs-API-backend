const Joi = require('joi');
const { User } = require('../models');
const jwtUtil = require('../utils/jwt.util');

const validaCadastro = (body) => {
    const usr = Joi.object({
        displayName: Joi.string().min(8).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        image: Joi.optional(),
    });

    const { error } = usr.validate(body);
    if (error) return { status: 400, message: error.details[0].message };
    return { status: null, message: null };
};

const validaEmail = async ({ displayName, email, password, image }) => {
    const user = await User.findOne({ where: { email } });
    console.log('user---> ', user);
    if (user) return { status: 409, message: { message: 'User already registered' } };
    await User.create({ displayName, email, password, image });
    const toke = jwtUtil.createToken({ displayName, email, password, image });
    return { status: 201, message: { token: toke } };
};

module.exports = { validaCadastro, validaEmail };