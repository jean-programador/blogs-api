const errorMap = {
  VALUE_ALREADY_EXIST: 409,
  INVALID_VALUE: 400,
  USER_NOT_FOUND: 404,
  NOT_AUTHORIZED: 401,
  POST_NOT_FOUND: 404,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};
