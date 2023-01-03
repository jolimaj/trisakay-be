const Base = require("../Base");

class Rating extends Base {
  static get tableName() {
    return "driver_rating";
  }
}

module.exports = Rating;
