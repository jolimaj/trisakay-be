const bcrypt = require("bcrypt");

const securePassword = (password) => {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
};
const comparePassword = (password,encrypted) => {
  const unhashedPassword = bcrypt.compareSync(password, encrypted);
  return unhashedPassword;
};
module.exports = {securePassword,comparePassword};
