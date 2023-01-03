const Joi = require("joi");
module.exports = {
  schema: Joi.object({
    receiverID: Joi.string().required(),
    senderID: Joi.string().required(),
    messages: Joi.string().min(1).max(50).required(),
  }),
  location: "body",
};
