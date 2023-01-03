const Base = require("../Base");

class Drivers extends Base {
  static get tableName() {
    return "driver";
  }
}

module.exports = Drivers;
