const userRouter = require('./user.routes');
const authRouter = require('./auth.routes');
const categoryRouter = require('./category.routes');
const postRouter = require('./post.routes');

module.exports = {
  authRouter,
  userRouter,
  categoryRouter,
  postRouter,
};