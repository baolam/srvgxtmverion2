/**
 * Code chỉ dùng để nghiên cứu
 */
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const ip = require("ip");

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server);

require("./src/routes/routes")(app);

const Wemos = require("./src/socket.io/Wemos");
const wemos_ = io.of("/wemos");
const user_ = io.of("/io/user");

new Wemos(wemos_, user_);

/**
 * Chạy server
 */
server.listen(process.env.PORT | 3000, () => {
  console.log(`Server is listening!. ${ip.address()}:${process.env.PORT | 3000}`);
});