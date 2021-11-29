const Places = require("../models/places");
const Events = require("../config/DeviceEvents");

class ManageCarForm {
  static max_position = 4;

  handle(req, res) {
    let { ho, ten, code } = req.body;
    let structure = {
      ho,
      ten,
      code,
      fullname : `${ho} ${ten}`
    }

    // --------------------------------------------
    Places.db.then((f) => {
      function search_exist() {
        let temp = f.get("places").find({ code }).value();
        if (temp == undefined)
          return false;
        return temp;
      }
      let state = search_exist();
      if (typeof(temp) == 'boolean') {
        console.log("TRẠNG THÁI LÀ CHƯA GỬI XE. CHƯA CÓ ĐƠN ĐĂNG KÝ");
        // --------------------------------------------------------------

        function get_pos() {
          // Load position
          let places = f.get("places").toJSON();
          let postion_possible = places.map((user) => user.position);
          
          if (postion_possible.length == ManageCarForm.max_position) {
            return -1;
          }

          for (let i = 1; i < ManageCarForm.max_position; i++) {
            if (postion_possible.indexOf(i) == -1) {
              return i;
            }
          }
        }

        let position = get_pos();

        if (position == -1) {
          res.status(200).json({
            err : false,
            msg : "Bãi đỗ xe đã đầy vị trí"
          });
          return;
        }

        f.get("places").push({
          ...structure,
          state : false, // Đã gửi xe
          position
        }).write();

        // Gửi dữ liệu
        Events.emit("control", {
          state : false,
          position
        });

        // Gửi phản hồi
        res.status(200).send({
          err : false,
          msg : "Gửi dữ liệu thành công"
        });
      }
      else {
        console.log("TRẠNG THÁI LÀ ĐÃ GỬI XE.");
        // -----------------------------------------------------------------
        let { state, position } = state;

        if (code == state.code) {
          f.get("places").remove({
            ...structure,
            state : false,
            position
          }).write();

          // Gửi dữ liệu
          Events.emit("control", {
            position,
            state : true
          });

          // Thực hiện tiếp
          res.status(200).send({
            err : false,
            msg : "Gửi dữ liệu thành công"
          });
        }
        else {
          res.status(200).send({
            err : true,
            msg : "Sai mã code"
          });
        }
      }
    });
  }
}

module.exports = new ManageCarForm();