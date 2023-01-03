const Joi = require("joi");
module.exports = {
  schema: Joi.object({
    email: Joi.string().email().trim(true).required().messages({
      "string.base": `Ang "email" ang kailangang nasa tamang format!`,
      "string.empty": `Ang "email" ay hindi pweding blanko!`,
    }),
  }),
  location: "body",
};
