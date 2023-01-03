exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("fee").del();
  await knex("fee").insert([{ name: "23", date: new Date() }]);
};
