const { userService } = require('../services');
const jwt = require('../utils/jwt');

const createUser = async (req, res) => {
  const user = req.body;

  const userResponse = await userService.createUser(user);

  const token = jwt.generateToken(userResponse.id);

  return res.status(201).json({ token });
};

const getAll = async (_req, res) => {
  const users = await userService.getAll();

  return res.status(200).json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getById(id);

  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const authorization = req.header('Authorization');
  const { data: { userId } } = jwt.decodeToken(authorization);

  await userService.deleteUser(userId);

  res.status(204).json();
};

module.exports = {
  createUser,
  getAll,
  getUser,
  deleteUser,
};