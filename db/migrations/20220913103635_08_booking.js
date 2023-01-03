exports.up = async function (knex) {
  await knex.schema.createTable("bookings", (table) => {
    table.increments("id").primary().unsigned();
    table.integer("passengerID").notNullable();
    table.integer("driverID").notNullable();
    table.string("fee").notNullable();
    table.date("date").notNullable();
    table.text("details").notNullable();
    table.integer("status").defaultTo(0); //1 accepted 2 rejected 3 cancell  0 booked
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("bookings");
};
