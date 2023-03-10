const { newUserSchema } = require('./schema');

const validateNewUser = ({ displayName, email, password }) => {
  const { error } = newUserSchema.validate({ displayName, email, password });

  if (error) {
    const err = new Error(error.message);
    err.name = 'INVALID_VALUE';
    throw err;
  }
};

module.exports = {
  validateNewUser,
};
