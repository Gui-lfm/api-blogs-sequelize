const { User } = require('../models');

const getUsers = () => User.findAll();

const getUserById = (id) => User.findByPk(id);

const getUserByEmail = (email) => User.findOne({ where: { email } });

const createUser = ({ displayName, email, password }) =>
  User.create({ displayName, email, password });

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
};
