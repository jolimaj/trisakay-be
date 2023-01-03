exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  await knex('roles').insert([
    { name: 'Admin'},
    { name: 'Driver'},
    { name: 'Passenger'},
  ]);
};
