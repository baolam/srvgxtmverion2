const express = require("express");

const Router = express.Router();

Router.use("/login", require('./user/login'));

module.exports = Router;