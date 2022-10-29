const postService = require('../services/post.service');
const userService = require('../services/user.service');

const addPost = async (req, res) => {
    const { authorization } = req.headers;
    const retorno = userService.validateToken(authorization);
    if (retorno.status) return res.status(retorno.status).json({ message: retorno.message });

    const ret = await postService.getById(req.body);
    if (ret) return res.status(ret.status).json({ message: ret.message });
    
    const { status, message } = await postService.add(req.body);
    res.status(status).json(message);
};

const get = async (req, res) => {
    const { authorization } = req.headers;
    const retorno = userService.validateToken(authorization);
    if (retorno.status) return res.status(retorno.status).json({ message: retorno.message });

    const tr = await postService.getAll();
    res.status(200).json(tr);
};

module.exports = { addPost, get };