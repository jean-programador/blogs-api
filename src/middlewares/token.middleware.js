const { decodeToken } = require('../utils/jwt');

module.exports = (req, _res, next) => {
  const authorization = req.header('Authorization');

  decodeToken(authorization);

  next();
};
