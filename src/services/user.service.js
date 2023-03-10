const { User } = require('../models');
const { validateNewUser } = require('./validations/validateInputValues');

const createUser = async ({ displayName, email, password, image }) => {
  validateNewUser({ displayName, email, password });

  const user = await User.findOne({ where: { email } });

  if (user) {
    const err = new Error('User already registered');
    err.name = 'VALUE_ALREADY_EXIST';
    throw err;
  }

  const userCreated = await User.create({ displayName, email, password, image });

  return userCreated;
};

const getAll = async () => User.findAll({ attributes: { exclude: ['password'] } });

const getById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    const err = new Error('User does not exist');
    err.name = 'USER_NOT_FOUND';
    throw err; 
  }

  return user;
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  createUser,
  getAll,
  getById,
  deleteUser,
};