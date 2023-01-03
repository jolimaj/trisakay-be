const Base = require("../Base");

class Messages extends Base {
  static get tableName() {
    return "messages";
  }
}

module.exports = Messages;
