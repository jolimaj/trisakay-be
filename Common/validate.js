const validateTerms = require("./Validations/Terms/validateTerms");
const validateTodas = require("./Validations/Todas/validateTodas");
const validateUsers = require("./Validations/Users/validateUsers");
const validateRegistration = require("./Validations/Account/validateRegistration");
const validateLogin = require("./Validations/Account/validateLogin");
const validatePassword = require("./Validations/Account/validatePassword");
const validateForgotPassword = require("./Validations/Account/validateForgotPassword");
const validatePicture = require("./Validations/Account/validatePicture");
const validateCreate = require("./Validations/Messages/validateCreate");
const validateBooking = require("./Validations/validateBooking");

function schemaValidate(template, req, res, next) {
  try {
    const validate = template.schema.validate(req[template.location]);
    if (validate.error) {
      return res.status(400).json({
        error: validate.error.details.map((e) => e.message.replace(/"/gim, "")),
      });
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({
      message: e.toString(),
    });
  }
}

const validate = {
  // Terms
  validateTerms: (req, res, next) =>
    schemaValidate(validateTerms, req, res, next),
  //Toda
  validateTodas: (req, res, next) =>
    schemaValidate(validateTodas, req, res, next),
  //Users
  validateUsers: (req, res, next) =>
    schemaValidate(validateUsers, req, res, next),
  //Registration
  validateRegistration: (req, res, next) =>
    schemaValidate(validateRegistration, req, res, next),
  //Login
  validateLogin: (req, res, next) =>
    schemaValidate(validateLogin, req, res, next),
  //Password
  validatePassword: (req, res, next) =>
    schemaValidate(validatePassword, req, res, next),
  //Forgot Password
  validateForgotPassword: (req, res, next) =>
    schemaValidate(validateForgotPassword, req, res, next),
  //Picture
  validatePicture: (req, res, next) =>
    schemaValidate(validatePicture, req, res, next),
  //Message
  validateCreate: (req, res, next) =>
    schemaValidate(validateCreate, req, res, next),
  validateBooking: (req, res, next) =>
    schemaValidate(validateBooking, req, res, next),
};

module.exports = validate;
