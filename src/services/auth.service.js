const Joi = require('joi');
const jwtUtil = require('../utils/jwt.util');

const { User } = require('../models');

const validateBody = (params) => {
    const schema = Joi.object({
        email: Joi.string().email().required(), // .message({    message: 'Some required fields are missing'}),
        password: Joi.string().required(), // .message({ message: 'Some required fields are missing'}),
    });

    const { error, value } = schema.validate(params);
    if (error) return { status: 400, message: 'Some required fields are missing' };
    return value;
};

const validateLogin = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
        return { status: 400, message: 'Invalid fields' };
    }
    const { password: _, ...userWithoutPassword } = user.dataValues;
    console.log(userWithoutPassword);

    const token = jwtUtil.createToken(userWithoutPassword);
    console.log(token);
    return token;
};

const validateToken = (token) => {
    if (!token) {
        const e = new Error('token obrigatorio');
        e.name = 'token obrigatorio';
        throw e;  
    }

    const user = jwtUtil.validateToken(token);
    return user;
};

module.exports = { validateBody, validateLogin, validateToken };