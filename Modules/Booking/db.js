const Base = require("../Base");

class Booking extends Base {
  static get tableName() {
    return "bookings";
  }
}

module.exports = Booking;
