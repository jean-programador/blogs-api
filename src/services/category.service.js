const { Category } = require('../models');

const createCategory = async (name) => Category.create({ name });

const getAll = async () => Category.findAll();

module.exports = {
  createCategory,
  getAll,
};
