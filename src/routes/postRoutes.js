const express = require('express');
const posts = require('../controllers/PostController');
const { 
  verifyUser,
  verifyToken,
  verifyAuthorship,
  verifyCategory,
  verifyPost,
} = require('../middlewares');

const postRoutes = express.Router();

postRoutes.get('/', verifyToken, posts.getPosts);
postRoutes.get('/:id', verifyToken, posts.getPostById);
postRoutes.post('/', verifyToken, verifyUser, verifyCategory, posts.createPost);
postRoutes.put('/:id', verifyToken, verifyUser, verifyAuthorship, posts.updatePost);
postRoutes.delete('/:id', verifyToken, verifyPost, verifyAuthorship, posts.deletePost);

module.exports = postRoutes;
