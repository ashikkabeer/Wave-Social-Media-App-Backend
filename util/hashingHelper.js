const bcrypt = require("bcrypt");

const hashPassword = async (password, saltRounds = 10) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePassword = async (givenPassword, hashedPassword) => {
  const passwordMatch = await bcrypt.compare(givenPassword, hashedPassword);
  return passwordMatch;
};
module.exports = { hashPassword, comparePassword };