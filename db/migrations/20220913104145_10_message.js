exports.up = async function (knex) {
  await knex.schema.createTable("messages", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("receiverID").notNullable(); //driver or passenger id
    table.integer("senderID").notNullable(); //driver or passenger id
    table.text("messages");
    table.datetime("createdAt");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("messages");
};
