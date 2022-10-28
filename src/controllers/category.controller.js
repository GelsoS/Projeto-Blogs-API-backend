const categoryService = require('../services/category.service');
const userService = require('../services/user.service');

const createCategory = async (req, res) => {
    const { authorization } = req.headers;
    const { status, message } = userService.validateToken(authorization);
    if (status) return res.status(status).json({ message });
    const result = await categoryService.create(req.body);
    res.status(result.status).json(result.message);
};

module.exports = { createCategory };