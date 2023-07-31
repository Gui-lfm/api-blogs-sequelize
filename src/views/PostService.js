const { BlogPost, User, Category, PostCategory, sequelize } = require('../models');

const addPost = async (title, content, categoryIds, userId) => {
  const result = await sequelize.transaction(async (t) => {
    const published = new Date();
    const post = await BlogPost.create({ 
      title,
      content,
      userId,
      published,
      updated: published,
    }, { transaction: t });
    
    const categoryAssociations = categoryIds.map(async (categoryId) => {
      await PostCategory.create({ postId: post.id, categoryId }, { transaction: t });
    });
    
    await Promise.all(categoryAssociations);
    
    return post;
  });

  return result;
};

const getPosts = () =>
  BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

const getPostById = (id) =>
  BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

const updatePost = async ({ id, title, content }) => {
  await BlogPost.update({ title, content }, { where: { id } });
  
  const updatedPost = await getPostById(id);

  return updatedPost;
};

const deletePost = async (id) => {
  const post = await BlogPost.findByPk(id);
  await post.destroy();
};

module.exports = {
  addPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
