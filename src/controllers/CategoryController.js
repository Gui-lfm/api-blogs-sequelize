const { CategoryService } = require('../views');

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: '"name" is required' });
    }
    const response = await CategoryService.addCategory(name);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCategories = async (_req, res) => {
  try {
    const categories = await CategoryService.getCategories();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addCategory,
  getCategories,
};
