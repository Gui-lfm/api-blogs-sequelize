const express = require('express');
const router = require('./routes');
const loginRoutes = require('./routes/loginRoutes');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use(router);
app.post('/login', loginRoutes.login);

module.exports = app;
