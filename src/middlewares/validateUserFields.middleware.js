module.exports = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (!email || !password || !displayName) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }

  next();
};
