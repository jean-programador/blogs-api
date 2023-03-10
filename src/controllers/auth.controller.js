const { authService } = require('../services');
const jwt = require('../utils/jwt');

const auth = async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.validate(email, password);

  if (!user) return res.status(400).json({ message: 'Invalid fields' });

  const token = jwt.generateToken(user.id);
  return res.status(200).json({ token });
};

module.exports = {
  auth,
};
