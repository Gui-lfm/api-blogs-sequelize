const express = require('express');
const routes = require('./routes');
const user = require('./controllers/UserController');
const category = require('./controllers/CategoryController');
const { verifyName, verifyEmail, verifyPassword, verifyToken } = require('./middlewares');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', routes.login);

app.post('/user', verifyName, verifyEmail, verifyPassword, user.createUser);

app.get('/user', verifyToken, user.getAllUsers);

app.get('/user/:id', verifyToken, user.getUserById);

app.post('/categories', verifyToken, category.addCategory);

app.get('/categories', verifyToken, category.getCategories);

module.exports = app;
