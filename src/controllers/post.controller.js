const postService = require('../services/post.service');
const userService = require('../services/user.service');

const addPost = async (req, res) => {
    // requisito 12
    const { authorization } = req.headers;
    const retorno = userService.validateToken(authorization);
    if (retorno.status) return res.status(retorno.status).json({ message: retorno.message });

    const ret = await postService.getById(req.body);
    if (ret) return res.status(ret.status).json({ message: ret.message });
    
    const { status, message } = await postService.add(retorno.message.id, req.body);
    res.status(status).json(message);
};
 
const get = async (req, res) => {
    const { authorization } = req.headers;
    const retorno = userService.validateToken(authorization);
    if (retorno.status) return res.status(retorno.status).json({ message: retorno.message });

    const tr = await postService.getAll();
    res.status(200).json(tr);
};

const getId = async (req, res) => {
    const { authorization } = req.headers;
    const { id } = req.params;
    const retorno = userService.validateToken(authorization);
    if (retorno.status) return res.status(retorno.status).json({ message: retorno.message });

    const { status, message } = await postService.getId(id);
    res.status(status).json(message);
};

const putId = async (req, res) => {
    const { id } = req.params;
    const { authorization } = req.headers;
    const retorno = userService.validateToken(authorization);
    if (retorno.status) return res.status(retorno.status).json({ message: retorno.message });

    const e = await postService.putId(id, req);
    res.status(e.status).json(e.message);
};

const deleteId = async (req, res) => {
    const { authorization } = req.headers;
    const retorno = userService.validateToken(authorization);
    if (retorno.status) return res.status(retorno.status).json({ message: retorno.message });

    const e = await postService.del(req);
     res.status(e.status).json(e.message);
};

const search = async (req, res) => {
    const { authorization } = req.headers;
    const retorno = userService.validateToken(authorization);
    if (retorno.status) return res.status(retorno.status).json({ message: retorno.message });
    
    const { q } = req.query;
    const result = await postService.search(q);
    
    res.status(200).json(result);
};

module.exports = { addPost, get, getId, putId, deleteId, search };