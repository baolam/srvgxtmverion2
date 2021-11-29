const path = require("path");
const lowdb = require("lowdb");
const Adapter = require("lowdb/adapters/FileAsync");

class SaveData {
  default_path = path.join(__dirname, "../", "saved", "sockets.json");

  async getDb() {
    let db = lowdb(new Adapter(this.default_path));

    db.then((f) => {
      f.defaults({
        sockets : []
      })
    });

    return db;
  }

  addNewData(socket, user, device=false) {
    return new Promise((res, rej) => {
      (async () => {
        let db = await this.getDb();
        let information = db.get("sockets").find({ user }).value();

        if (information == undefined) {
          if (device) {
            db.get("users").push({
              user,
              users : [],
              devices : [{
                socket
              }]
            }).write();
          }
          else {
            db.get("users").push({
              user,
              users : [{
                socket
              }],
              devices : []
            }).write();
          }

          res(true);
        }
        else {

        }
      });
    });
  }

  searchData(user) {
    return new Promise((res, rej) => {
      (async () => {
        let db = await this.getDb();
        let information = db.get("sockets").find({ user }).toJSON();
        
        if (information == undefined) {
          return rej([]);
        }
        return res(information);
      });
    });
  }

  delete(user, socket, device=false) {
    
  }
}

module.exports = SaveData;