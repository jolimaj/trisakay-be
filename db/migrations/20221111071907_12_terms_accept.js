exports.up = async function (knex) {
  await knex.schema.createTable("terms_accept", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("userID");
    table.boolean("accepted").defaultTo(false);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("terms_accept");
};
