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

const getById = async (req, res) => {
    const { params: { id }, headers: { authorization } } = req;
    const { status, message } = userService.validateToken(authorization);
    if (status) return res.status(status).json({ message });
    const response = await userService.getById(id);
    if (response.status) return res.status(response.status).json(response);
    res.status(200).json(response);
};

const delMe = async (req, res) => {
    const { headers: { authorization } } = req;
    const { status, message } = userService.validateToken(authorization);
    if (status) return res.status(status).json({ message });

    await userService.delMe(message.id);
    res.status(204).json();
};

module.exports = { createUser, getUser, getById, delMe };