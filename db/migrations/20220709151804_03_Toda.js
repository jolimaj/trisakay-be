exports.up = async function (knex) {
  await knex.schema.createTable("toda", (table) => {
    table.increments("id").primary().unsigned()
    table.string("code", 50).notNullable()
    table.string("name", 150).notNullable()
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("toda")
};
