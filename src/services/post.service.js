const Joi = require('joi');
const { Category, BlogPost, PostCategory, User } = require('../models');

const add = async ({ title, content, categoryIds }) => {
    const rs = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        categoryIds: Joi.array().items(Joi.number().required()),
    });

    const resposta = rs.validate({ title, content, categoryIds });
    const { error } = resposta;
    if (error) return { status: 400, message: { message: 'Some required fields are missing' } };

    const ret = await BlogPost.create({
        title, content, userId: 1, updated: new Date(), published: new Date(),
    });
    const r = await categoryIds.map((a) => PostCategory.create({ postId: ret.id, categoryId: a }));
    await Promise.all(r);
    return { status: 201, message: ret };
};

const getById = async ({ categoryIds }) => {
    const result = await categoryIds.map((a) => Category.findByPk(a));
    const rt = await Promise.all(result);
    for (let index = 0; index < rt.length; index += 1) {
        if (!rt[index]) {
            return { status: 400, message: 'one or more "categoryIds" not found' };
        }
    }
};

const getAll = async () => {
    const retorno = await BlogPost.findAll({ include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories' },
    ] });
    return retorno;
};

module.exports = { add, getById, getAll };