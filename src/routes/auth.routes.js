const express = require('express');
const { authController } = require('../controllers');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', authMiddleware, authController.auth);

module.exports = router;
