const { UserService } = require('../services');
const { validateToken } = require('../auth/authFunctions');

// verifica se token contem um usuário existente
module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  const decoded = validateToken(authorization);
  const receivedId = decoded.data.id;

  const userExists = await UserService.getUserById(receivedId);

  if (!userExists) {
    return res.status(404).json({ message: 'User does not exists' });
  }

  next();
};
