const userService = require('../services/user.service');

const createUser = async (req, res) => {
    const { status, message } = userService.validaCadastro(req.body);
    if (status) return res.status(status).json({ message });

    const rs = await userService.validaEmail(req.body);
    res.status(rs.status).json(rs.message);
};

const getUser = async (req, res) => {
    const { authorization } = req.headers;
    const { status, message } = userService.validateToken(authorization);
    if (status) return res.status(status).json({ message });
    const resp = await userService.getUser();
    res.status(200).json(resp);
};
module.exports = { createUser, getUser };