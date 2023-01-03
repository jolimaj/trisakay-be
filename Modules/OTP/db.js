const Base = require("../Base");

class OTP extends Base {
  static get tableName() {
    return "otp";
  }
}

module.exports = OTP;
