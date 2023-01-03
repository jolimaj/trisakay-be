const Joi = require("joi");

const validatePictures = {
  schema: Joi.object({
    licence_pic: Joi.any().meta({ swaggerType: "file" }).required().messages({
      "any.required": "{{#label}} is required! or Please check if file exists.",
      "string.empty": "{{#label}} cannot be empty!!",
    }),
    franchise_pic: Joi.any().meta({ swaggerType: "file" }).required().messages({
      "any.required": "{{#label}} is required! or Please check if file exists.",
      "string.empty": "{{#label}} cannot be empty!!",
    }),
    registration_pic: Joi.any()
      .meta({ swaggerType: "file" })
      .required()
      .messages({
        "any.required":
          "{{#label}} is required! or Please check if file exists.",
        "string.empty": "{{#label}} cannot be empty!!",
      }),
    tric_pic: Joi.any().meta({ swaggerType: "file" }).required().messages({
      "any.required": "{{#label}} is required! or Please check if file exists.",
      "string.empty": "{{#label}} cannot be empty!!",
    }),
  }),
  location: "files",
};

module.exports = validatePictures;
