const userService = require('../services/user.service');

const createUser = async (req, res) => {
    const { status, message } = userService.validaCadastro(req.body);
    if (status) return res.status(status).json({ message });

    const rs = await userService.validaEmail(req.body);
    res.status(rs.status).json(rs.message);
};

module.exports = { createUser };