const { User } = require('../models');

const getUsers = () => User.findAll();

const getUserById = (id) => User.findByPk(id);

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
