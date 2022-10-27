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
        return data;
    } catch (error) {
        const e = new Error('token invalido');
        e.name = 'nao valido';
        throw e;
    }
};

module.exports = { createToken, validateToken };