exports.up = async function (knex) {
  await knex.schema.createTable("fee", (table) => {
    table.increments("id").primary().unsigned();
    table.string("name", 150).notNullable();
    table.date("date");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("fee");
};
