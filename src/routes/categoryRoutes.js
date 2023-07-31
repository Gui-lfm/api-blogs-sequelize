const express = require('express');
const category = require('../controllers/CategoryController');
const verifyToken = require('../middlewares/verifyToken');

const categoryRoutes = express.Router();

categoryRoutes.post('/', verifyToken, category.addCategory);

categoryRoutes.get('/', verifyToken, category.getCategories);

module.exports = categoryRoutes;