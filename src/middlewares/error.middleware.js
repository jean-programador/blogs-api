const errorMap = require('../utils/errorMap');

module.exports = (err, _req, res, _next) => {
  const status = errorMap.mapError(err.name) || 500;
  const message = err.message || 'Erro inesperado. Por favor, tente mais tarde';

  return res.status(status).json({ message });
};
