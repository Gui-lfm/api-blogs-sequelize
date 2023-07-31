const { Category } = require('../models');

const addCategory = (name) => Category.create({ name });

const getCategories = () => Category.findAll();

const getCategoryById = (id) => Category.findByPk(id);

module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
};
