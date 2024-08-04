const bcrypt = require("bcryptjs");

module.exports = {
  encrypt: (password) => bcrypt.hashSync(password),
  match: (password, hashedPassword) =>
    bcrypt.compareSync(password, hashedPassword),
};
