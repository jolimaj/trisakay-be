const {securePassword} = require("../../Common/validatePassword")
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {roleID:1,email:'trisakay36@gmail.com',password:securePassword('TriSakay@123456'),status:1},
  ]);
};
