const express = require('express');
const { userController } = require('../controllers');
const validateUserFields = require('../middlewares/validateUserFields.middleware');
const tokenMiddleware = require('../middlewares/token.middleware');

const router = express.Router();

router.post('/', validateUserFields, userController.createUser);
router.get('/', tokenMiddleware, userController.getAll);
router.get('/:id', tokenMiddleware, userController.getUser);
router.delete('/me', tokenMiddleware, userController.deleteUser);

module.exports = router;
