const bcrypt = require('bcrypt');

const hashPassword = async (password, saltRounds) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const comparePassword = async (givenPassword, hashedPassword) => {
  const passwordMatch = await bcrypt.compare(givenPassword, hashedPassword);
  if (!passwordMatch) {
    const error = new Error('Password Mismatch. Try again.');
    error.status = 404;
    throw error;
  }
  return passwordMatch;
};
module.exports = { hashPassword, comparePassword };
