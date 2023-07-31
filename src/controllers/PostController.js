const { PostService } = require('../views');
const { validateToken } = require('../auth/authFunctions');
const verifyBody = require('../utils/verifyBody');

const createPost = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { title, content, categoryIds } = req.body;

    if (!verifyBody(title, content, categoryIds)) {
      return res
        .status(400)
        .json({ message: 'Some required fields are missing' });
    }

    const { id } = validateToken(authorization).data;

    const response = await PostService.addPost(title, content, categoryIds, id);
    return res.status(201).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPosts = async (_req, res) => {
  try {
    const posts = await PostService.getPosts();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostService.getPostById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!verifyBody(title, content)) {
      return res
        .status(400)
        .json({ message: 'Some required fields are missing' });
    }
    const updatedPost = await PostService.updatePost({ id, title, content });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log('aqui', error);
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await PostService.deletePost(id);
    return res.status(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  getPostById,
  updatePost,
  createPost,
  deletePost,
};
