const Database = require("../config/Database");

const places = new Database("places.json", {
  places : []
});

module.exports = places;