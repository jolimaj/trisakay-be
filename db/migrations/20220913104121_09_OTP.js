exports.up = async function (knex) {
  await knex.schema.createTable("otp", (table) => {
    table.increments("id").primary().unsigned();
    table.string("userID").notNullable();
    table.string("otp").notNullable();
    table.datetime("createdAt");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("otp");
};
