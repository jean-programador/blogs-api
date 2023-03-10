const { Op } = require('sequelize');
const { BlogPost, Category, User } = require('../models');

const verifyCategoriesIds = (categories, categoryIds) => {
  const foundsIds = categories.map((category) => category.id);
  const notFoundIds = categoryIds.filter((id) => !foundsIds.includes(id));

  if (notFoundIds.length > 0) {
    const err = new Error('one or more "categoryIds" not found');
    err.name = 'INVALID_VALUE';
    throw err;
  }
};

const createPost = async ({ title, content, categoryIds }, userId) => {
  const categories = await Category.findAll({ where: { id: categoryIds } });

  verifyCategoriesIds(categories, categoryIds);

  const post = await BlogPost.create({
    title,
    content,
    userId,
    updated: Date.now(),
    published: Date.now(),
  });

  post.addCategories(categories);

  return post;
};

const getAll = async () =>
  BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });

const getById = async (id, userId) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });

  if (!post) {
    const err = new Error('Post does not exist');
    err.name = 'POST_NOT_FOUND';
    throw err;
  }

   if (userId && post.user.id !== userId) {
     const err = new Error('Unauthorized user');
     err.name = 'NOT_AUTHORIZED';
     throw err;
   }

  return post;
};

const updatePost = async (id, userId, { title, content }) => {
  await getById(id, userId); // Para verificar se o 'Post' existe e 'userId' é o mesmo que criou o 'Post'

  await BlogPost.update(
    {
      title,
      content,
    },
    { where: { id } },
  );
    
  const postUpdated = await getById(id);

  return postUpdated;
};

const deletePost = async (id, userId) => {
  await getById(id, userId); // Para verificar se o 'Post' existe e 'userId' é o mesmo que criou o 'Post'

  await BlogPost.destroy({ where: { id } });
};

const serachPost = async (search) => {
  if (!search) return getAll();

  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${search}%` } },
        { content: { [Op.like]: `%${search}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });

  return posts;
};

module.exports = {
  createPost,
  getAll,
  getById,
  deletePost,
  serachPost,
  updatePost,
};
