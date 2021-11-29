const bcrypt = require("bcryptjs");
const Users = require("../models/Users");

class LoginController {
  handle(req, res) {
    let { user, password } = req.body;

    Users.db.then((f) => {
      let information = f.get("users").find({ user }).value();

      if (information == undefined) {
        return;
      }

      if (! bcrypt.compareSync(password, information.password)) {
        return;
      }
    })
  }
}

module.exports = new LoginController();