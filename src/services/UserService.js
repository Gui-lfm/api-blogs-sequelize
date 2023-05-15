const { User } = require('../models');
// retorna a lista de usuários excluindo o atributo de senha, evitando a exposição de
// dados sensíveis.
const getUsers = () => User.findAll({ attributes: { exclude: ['password'] } });

const getUserById = (id) =>
  User.findByPk(id, { attributes: { exclude: ['password'] } });

const getUserByEmail = (email) => User.findOne({ where: { email } });

const createUser = (newUser) => {
  const { displayName, email, password, image } = newUser;

  const newUserData = { displayName, email, password };

  // caso o atributo image exista, ele é adicionado ao objeto de novo usuário
  if (image) {
    newUserData.image = image;
  }
  User.create(newUserData);
};

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
};
