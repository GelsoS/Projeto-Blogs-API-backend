const authService = require('../services/auth.service');

const login = async (req, res) => {
    const value = authService.validateBody(req.body);
    if (value.status === 400) return res.status(value.status).json(value);
    const result = await authService.validateLogin(value);
    if (result.status === 400) return res.status(result.status).json(result);
    res.status(result.status).json(result.message);
};

module.exports = { login };