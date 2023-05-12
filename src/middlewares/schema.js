const Joi = require('joi');

const displayNameSchema = Joi.string().min(8).required();

const passwordSchema = Joi.string().min(6).required();

module.exports = { displayNameSchema, passwordSchema };
