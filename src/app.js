const express = require('express');
const routes = require('./routes');
const user = require('./controllers/UserController');
const { verifyName, verifyEmail, verifyPassword } = require('./middlewares');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', routes.login);

app.post('/user', verifyName, verifyEmail, verifyPassword, user.createUser);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
