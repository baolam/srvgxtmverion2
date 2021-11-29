const Database = require("../config/Database");

const Users = new Database("users.json", {
  users : []
});

module.exports = Users;