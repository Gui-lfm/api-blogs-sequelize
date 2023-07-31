const express = require('express');
const user = require('../controllers/UserController');
const {
  verifyName,
  verifyEmail,
  verifyPassword,
  verifyToken,
} = require('../middlewares');

const userRoutes = express.Router();

userRoutes.post('/', verifyName, verifyEmail, verifyPassword, user.createUser);
userRoutes.get('/', verifyToken, user.getAllUsers);
userRoutes.get('/:id', verifyToken, user.getUserById);

module.exports = userRoutes;
