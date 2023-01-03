exports.up = async function (knex) {
  await knex.schema.createTable("terms", (table) => {
    table.increments("id").primary().unsigned();
    table.string("title", 50).notNullable();
    table.text("description").notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("terms");
};
