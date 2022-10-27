const userService = require('../services/user.service');

const createUser = async (req, res) => {
    const { value, error } = userService.validaCadastro(req.body);
    
    console.log({ value, error });
    res.status(200).json(value);
};

module.exports = { createUser };