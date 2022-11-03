const Joi = require('joi');
const { Category, BlogPost, PostCategory, User } = require('../models');
const userService = require('./user.service');

const add = async (id, { title, content, categoryIds }) => {
    const rs = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        categoryIds: Joi.array().items(Joi.number().required()),
    });

    const resposta = rs.validate({ title, content, categoryIds });
    const { error } = resposta;
    if (error) return { status: 400, message: { message: 'Some required fields are missing' } };

    const ret = await BlogPost.create({
        title, content, userId: id, updated: new Date(), published: new Date(),
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
    const retorno = await BlogPost.findAll({
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories' },
        ],
    });
    return retorno;
};

const getId = async (id) => {
    const result = await BlogPost.findOne(
        {
            where: { id },
            include: [
                { model: User, as: 'user', attributes: { exclude: ['password'] } },
                { model: Category, as: 'categories', through: { attributes: [] } },
            ],
        },
    );
    // const usr = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!result) return { status: 404, message: { message: 'Post does not exist' } };
    return { status: 200, message: result };
};

const putId = async (id, req) => {
    const rs = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
    });
    const r = rs.validate(req.body);
    const { error } = r;
    if (error) return { status: 400, message: { message: 'Some required fields are missing' } };

    const usr = await User.findOne({ where: { id } });
    const { message: { email } } = userService.validateToken(req.headers.authorization);

    if (usr.email !== email) return { status: 401, message: { message: 'Unauthorized user' } };
    await BlogPost.update(req.body, { where: { id } });
    return getId(id);
};

const del = async (req) => {
    const { id } = req.params;
    const { message: { email } } = userService.validateToken(req.headers.authorization);

    const r = await BlogPost.findByPk(id);
    if (!r) return { status: 404, message: { message: 'Post does not exist' } };

    const { dataValues } = await User.findOne({ where: { email } });
    if (dataValues.id !== r.dataValues.userId) {
        return { status: 401, message: { message: 'Unauthorized user' } };
    }

    await BlogPost.destroy({ where: { id }, force: true });
    return { status: 204, message: '' };
};

module.exports = { add, getById, getAll, getId, putId, del };