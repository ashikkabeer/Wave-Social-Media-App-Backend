const crypto = require("crypto");

const generateSecretKey = async () => {
  const secret = crypto.randomBytes(32).toString("hex");
  console.log(secret);
  return secret;
};
// console.log(generateSecretKey());
module.exports = generateSecretKey;
