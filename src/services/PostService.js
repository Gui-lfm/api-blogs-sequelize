const { BlogPost, User, Category } = require('../models');

const addPost = (title, content, categoryIds) =>
  BlogPost.create({ title, content, categoryIds });

const getPosts = () =>
  BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

module.exports = {
  addPost,
  getPosts,
};
