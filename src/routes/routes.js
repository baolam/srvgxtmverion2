const express = require("express");

/**
 * 
 * @param {*} app
 * @description
 * Config mô hình 
 */
module.exports = (app) => {
  app.use("/user", require("./users"));
}