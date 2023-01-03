exports.up = async function (knex) {
  await knex.schema.createTable("passenger", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("userID").notNullable();
    table.string("latitude");
    table.string("longitude");
  });
};
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("passenger");
};
