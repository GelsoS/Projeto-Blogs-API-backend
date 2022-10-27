const Joi = require('joi');

const validaCadastro = (body) => {
    const { displayName } = body;
    const usr = Joi.object({
        displayName: Joi.string().min(8).required().messages({
            message: '"displayName" length must be at least 8 characters long',
          }),
    });

    const { value, error } = usr.validate(displayName);
    return { value, error };
};

module.exports = { validaCadastro };