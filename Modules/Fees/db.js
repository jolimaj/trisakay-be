const Base = require("../Base");

class Fees extends Base {
  static get tableName() {
    return "fee";
  }
}

module.exports = Fees;
