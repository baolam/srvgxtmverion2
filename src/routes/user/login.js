const express = require("express");

const Router = express.Router();
const LoginController = require("../../controllers/LoginController");

Router.post("/", (req, res) => LoginController.handle(req, res));

module.exports = Router;