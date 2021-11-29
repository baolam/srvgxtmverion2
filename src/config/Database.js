const lowdb = require("lowdb");
const Adapter = require("lowdb/adapters/FileAsync");
const path = require("path");

class Database {
  root = path.join(__dirname, "saved");
  
  constructor(file, default_db) {
    this.file = file;
    this.default_db = default_db;
    this.update();
  }

  /**
   * Update file
   */
  update() {
    let adapter = new Adapter(path.join(this.root, this.file));
    let db = lowdb(adapter);
    this.db = db;

    // Khác
    db.then((f) => {
      f.defaults(this.default_db).write();
    });
  }
}

module.exports = Database;