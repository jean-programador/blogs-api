const express = require('express');
const { postController } = require('../controllers');
const tokenMiddleware = require('../middlewares/token.middleware');
const validateNewPostFilds = require('../middlewares/validateNewPostFields.middleware');
const validateUpdatePostFilds = require('../middlewares/validateUpdatePostFields.middleware');

const router = express.Router();

router.post(
  '/',
  tokenMiddleware,
  validateNewPostFilds,
  postController.createPost,
);

router.get(
  '/',
  tokenMiddleware,
  postController.getAll,
);

router.put('/:id', tokenMiddleware, validateUpdatePostFilds, postController.updatePost);

router.get('/search', tokenMiddleware, postController.serachPost);

router.get('/:id', tokenMiddleware, postController.getPost);

router.delete('/:id', tokenMiddleware, postController.deletePost);

module.exports = router;
