const Base = require("../Base");

class Passengers extends Base {
  static get tableName() {
    return "passenger";
  }
}

module.exports = Passengers;
