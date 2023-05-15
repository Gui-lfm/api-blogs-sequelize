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

const getAllUsers = async (_req, res) => {
  try {
    const users = await UserService.getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
};
