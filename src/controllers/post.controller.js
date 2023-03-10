const { postService } = require('../services');
const jwt = require('../utils/jwt');

const createPost = async (req, res) => {
  const authorization = req.header('Authorization');
  const { data: { userId } } = jwt.decodeToken(authorization);
  console.log(userId);
  const post = req.body;

  const postResponse = await postService.createPost(post, userId);

  return res.status(201).json(postResponse);
};

const getAll = async (_req, res) => {
  const posts = await postService.getAll();

  return res.status(200).json(posts);
};

const getPost = async (req, res) => {
  const { id } = req.params;

  const post = await postService.getById(id);

  return res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const authorization = req.header('Authorization');
  const { id } = req.params;
  const { data: { userId } } = jwt.decodeToken(authorization);

  const post = await postService.updatePost(id, userId, req.body);

  return res.status(200).json(post);
};

const deletePost = async (req, res) => {
    const authorization = req.header('Authorization');
    const { data: { userId } } = jwt.decodeToken(authorization);

    const { id } = req.params;

    await postService.deletePost(id, userId);

    return res.status(204).json();
};

const serachPost = async (req, res) => {
  const { q } = req.query;

  const posts = await postService.serachPost(q);

  return res.status(200).json(posts);
};

module.exports = {
  createPost,
  getAll,
  getPost,
  deletePost,
  serachPost,
  updatePost,
};
