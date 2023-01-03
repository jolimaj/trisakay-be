const Joi = require("joi");
module.exports = {
  schema: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required()
  }),
  location: "body",
};
