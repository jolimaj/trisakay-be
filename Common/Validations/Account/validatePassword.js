const Joi = require("joi");
module.exports = {
  schema: Joi.object({
    password: Joi.string().min(8).trim(true).required(),
  }),
  location: "body",
};
