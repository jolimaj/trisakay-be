const Joi = require("joi");
module.exports = {
  schema: Joi.object({
    email: Joi.string().email().trim(true).required(),
    password: Joi.string().min(8).trim(true).required(),
  }),
  location: "body",
};
