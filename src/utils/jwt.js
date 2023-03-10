const jwt = require('jsonwebtoken');
const { Error } = require('sequelize');
require('dotenv').config();

const TOKEN_SECRET = process.env.JWT_SECRET || 'minhasenhasupersecretaindetectavel';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (userId) => {
  try {
    return jwt.sign({ data: { userId } }, TOKEN_SECRET, jwtConfig);
  } catch (error) {
    throw new Error('Falha ao gerar token');
  }
};

const decodeToken = (token) => {
   if (!token) {
    const err = new Error('Token not found');
    err.name = 'NOT_AUTHORIZED';
    throw err;
   }

  try {
    const result = jwt.verify(token, TOKEN_SECRET);
    return result;
  } catch (error) {
    const err = new Error('Expired or invalid token');
    err.name = 'NOT_AUTHORIZED';
    throw err;
  }
};

module.exports = {
  generateToken,
  decodeToken,
};
