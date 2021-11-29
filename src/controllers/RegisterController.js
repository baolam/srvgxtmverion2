const bcrypt = require("bcryptjs");
const Users = require("../models/Users");

class RegisterController {
  handle(req, res) {
    let { emailkp, name, password } = req.body;
  }
}

module.exports = new RegisterController();