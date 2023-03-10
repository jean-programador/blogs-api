const { categoryService } = require('../services');

const createCategory = async (req, res) => {
  const { name } = req.body;

  const category = await categoryService.createCategory(name);

  return res.status(201).json({ id: category.id, name: category.name });
};

const getAll = async (_req, res) => {
  const categories = await categoryService.getAll();

  return res.status(200).json(categories);
};

module.exports = {
  createCategory,
  getAll,
};
