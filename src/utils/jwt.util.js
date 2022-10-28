require('dotenv/config');
const jwt = require('jsonwebtoken');

const createToken = (data) => {
    const token = jwt.sign({ data }, 'secretJWT', {
        expiresIn: '1d',
        algorithm: 'HS256',
    });
    return token;
};

const validateToken = (token) => {
    try {
        const { data } = jwt.verify(token, 'secretJWT');
        return { status: undefined, message: data };
    } catch (error) {
        return { status: 401, message: 'Expired or invalid token' };
    }
};

module.exports = { createToken, validateToken };