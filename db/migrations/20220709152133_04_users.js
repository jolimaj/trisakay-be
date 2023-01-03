exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("roleID");
    table.string("profile");
    table.string("fname");
    table.string("mname");
    table.string("lname");
    table.string("email");
    table.string("mobile");
    table.string("password");
    table.text("details");
    table.integer("status").defaultTo(2); //1 active 2 pending 3 not active
    table.boolean("isOnline").default(false);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("users");
};
