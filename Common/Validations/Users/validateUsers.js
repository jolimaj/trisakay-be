const Joi = require("joi");
module.exports = {
  schema: Joi.object({
    roleID: Joi.string().required(),
    mobile: Joi.string().required(),
    address: Joi.string().required(),
    toda_name: Joi.string().when("roleID", {
      is: Joi.any().valid(2),
      then: Joi.string().required(),
      otherwise: Joi.string().optional(),
    }),
    tric_num: Joi.string().when("roleID", {
      is: Joi.any().valid(2),
      then: Joi.string().required(),
      otherwise: Joi.string().optional(),
    }),
    p_motor: Joi.string().when("roleID", {
      is: Joi.any().valid(2),
      then: Joi.string().required(),
      otherwise: Joi.string().optional(),
    }),
    profile: Joi.string().optional(),
    passengerType: Joi.string().when("roleID", {
      is: Joi.any().valid(3),
      then: Joi.string()
        .valid(
          ...Object.values({
            NONE: "None",
            STUDENT: "Student",
            PWD: "PWD",
            Senior: "Senior",
          })
        )
        .insensitive()
        .required(),
      otherwise: Joi.string().optional(),
    }),
  }),
  location: "body",
};
