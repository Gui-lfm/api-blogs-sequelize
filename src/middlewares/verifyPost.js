const { PostService } = require('../views');

// verifica se o post existe:
module.exports = async (req, res, next) => {
  const { id } = req.params;

  const postExists = await PostService.getPostById(id);

  if (!postExists) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  next();
};
