exports.up = async function (knex) {
  await knex.schema.createTable("driver_rating", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("driver");
    table.string("rate").defaultTo("0");
    table.text("comment");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("driver_rating");
};
