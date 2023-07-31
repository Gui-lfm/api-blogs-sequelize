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
userRoutes.delete('/me', verifyToken, user.deleteUser);

module.exports = userRoutes;
