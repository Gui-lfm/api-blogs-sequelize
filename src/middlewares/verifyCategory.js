const { CategoryService } = require('../views');

module.exports = async (req, res, next) => {
  const { categoryIds } = req.body;

  const categories = await Promise.all(
    categoryIds.map(
      async (categoryId) => CategoryService.getCategoryById(categoryId),
    ),
  );

  const allExist = categories.every((category) => category !== null);

  if (!allExist) {
    return res
      .status(400)
      .json({ message: 'one or more "categoryIds" not found' });
  }

  next();
};
