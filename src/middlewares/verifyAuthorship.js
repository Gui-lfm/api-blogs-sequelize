const { validateToken } = require('../auth/authFunctions');
const { PostService } = require('../views');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  const { id: userId } = validateToken(authorization).data;

  const { id } = req.params;

  const postToUpdate = await PostService.getPostById(id);
  const { dataValues } = postToUpdate;

  if (dataValues.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  next();
};
