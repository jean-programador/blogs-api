const Joi = require('joi');

const newUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),

});

module.exports = {
  newUserSchema,
};
