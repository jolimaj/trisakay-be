const { Model } = require('objection')
const db = require('../../Common/database')

Model.knex(db)

class Base extends Model {

}

module.exports = Base
