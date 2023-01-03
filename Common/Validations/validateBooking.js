const Joi = require("joi");
module.exports = {
  schema: Joi.object({
    passengerID: Joi.number().required(),
    driverID: Joi.number().optional(),
    fee: Joi.string().required(),
    origin: Joi.object({
      lat: Joi.number().required(),
      long: Joi.number().required(),
    }),
    destination: Joi.object({
      lat: Joi.number().required(),
      long: Joi.number().required(),
    }),
    distance: Joi.number().required(),
    passNum: Joi.number().required(),
  }),
  location: "body",
};
