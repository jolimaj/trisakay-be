const Joi = require("joi");
module.exports = {
  schema: Joi.object({
    code: Joi.string().required(),
    name: Joi.string().required(),
  }),
  location: "body",
};
