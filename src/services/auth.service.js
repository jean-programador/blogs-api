const { User } = require('../models');

const validate = async (email, password) => {
  const user = await User.findOne({
    attributes: ['id'],
    where: { email, password },
  });

  return user;
};

module.exports = {
  validate,
};
