const express = require('express');
const routes = require('./routes');
const user = require('./controllers/UserController');
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

module.exports = app;
