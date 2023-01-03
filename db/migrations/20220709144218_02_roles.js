exports.up = async function (knex) {
  await knex.schema.createTable("roles", (table) => {
    table.increments("id").primary().unsigned()
    table.string("name", 150).notNullable()
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("roles")
};
