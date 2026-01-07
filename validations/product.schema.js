const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().min(0).required(),
});

module.exports = schema;
