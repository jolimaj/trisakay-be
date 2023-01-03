const Base = require('../Base')

class Users extends Base {
  static get tableName () {
    return 'users'
  }
}

module.exports = Users