const { createToken } = require('../auth/authFunctions');
const { UserService } = require('../services');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const newUser = { displayName, email, password, image };
    await UserService.createUser(newUser);
    const userWithoutPassword = { displayName, email, image };
    const token = createToken(userWithoutPassword);
    return res.status(201).json({ token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erro ao cadastrar usuário', error: error.message });
  }
};

module.exports = {
  createUser,
};
