const express = require('express');
const { categoryController } = require('../controllers');
const validateNameCategory = require('../middlewares/validateNameCategory.middleware');
const tokenMiddleware = require('../middlewares/token.middleware');

const router = express.Router();

router.post('/', tokenMiddleware, validateNameCategory, categoryController.createCategory);
router.get('/', tokenMiddleware, categoryController.getAll);

module.exports = router;
