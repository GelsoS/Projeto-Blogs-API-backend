const authService = require('../services/auth.service');

const login = async (req, res) => {
    const value = authService.validateBody(req.body);
    if (value.status) return res.status(value.status).json(value.message);
    const token = await authService.validateLogin(value);
    res.status(200).json({ token });
};

module.exports = { login };