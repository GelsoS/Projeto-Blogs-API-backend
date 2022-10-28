const Joi = require('joi');
const { Category } = require('../models');

const create = async (body) => {
    const res = Joi.object({ name: Joi.string().required() });

    const { error } = res.validate(body);
    if (error) return { status: 400, message: { message: '"name" is required' } };

   const result = await Category.create(body);
   return { message: result, status: 201 };
};

module.exports = { create };