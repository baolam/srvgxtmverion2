const bcrypt = require("bcryptjs");
const Users = require("../models/Users");
const SaveData = require("../api/SaveData");
const deviceEvents = require("../config/DeviceEvents");

class Wemos {
  constructor(wemos, user) {
    this.wemos = wemos;
    this.user = user;

    this.saveData = new SaveData();

    wemos.on("connection", (socket) => {
      socket.emit("how_do_you_feel", "");

      // Đăng nhập
      socket.on("register", (data) => {
        let public_token = data.public_token;
        let private_token = data.private_token;
        let user = data.user;

        if (public_token != "NDBL_LNLT") {
          socket.emit("register_failed", "");
          return;
        }

        if (id == undefined) {
          socket.emit("register_failed", "");
          return;
        }

        // Tiến hành đăng nhập
        Users.db.then((f) => {
          let information = f.get("users").find({ user }).value();

          if (information == undefined) {
            socket.emit("register_failed", "");
            return;
          }

          if (! bcrypt.compareSync(private_token, information.password)) {
            socket.emit("register_failed", "");
            return;
          }

          this.saveData.addNewData(socket.id, user, true)
          .then(() => {
            socket.emit("register_success", "");
          })
          .catch(() => {
            socket.emit("register_failed", "");
          });
        });
      });

      // Nhận dữ liệu phản hồi
      socket.on("response", (infor) => {
        let { user, state } = infor;

        this.saveData.searchData(user)
        .then((information) => {
          let { users } = information;
          
          users.forEach((user) => {
            this.user.to(user.socket).emit("success", "");
          });
        })
        .catch(() => {});

        // Tiến hành cập nhật dữ liệu
        Users.db.then((f) => {
          let information = f.get("users").find({ user }).value();

          information.state = state;

          f.get("users").find({ user }).assignWith(information).value();
        });
      });

      // Nhận dữ liệu điều khiển
      deviceEvents.addListener("control", (infor) => {
        this.wemos.emit("control", infor);
      }); 
    });
  }
}

module.exports = Wemos;