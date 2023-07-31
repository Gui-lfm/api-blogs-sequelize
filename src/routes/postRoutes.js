const express = require('express');
const posts = require('../controllers/PostController');
const { 
  verifyUser,
  verifyToken,
  verifyAuthorship,
  verifyCategory,
} = require('../middlewares');

const postRoutes = express.Router();

postRoutes.get('/', verifyToken, posts.getPosts);
postRoutes.get('/:id', verifyToken, posts.getPostById);
postRoutes.post('/', verifyToken, verifyUser, verifyCategory, posts.createPost);
postRoutes.put('/:id', verifyToken, verifyUser, verifyAuthorship, posts.updatePost);

module.exports = postRoutes;
