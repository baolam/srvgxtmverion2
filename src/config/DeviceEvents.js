const events = require("events");
const EventEmitter = new events.EventEmitter();

EventEmitter.setMaxListeners(100000);

module.exports = EventEmitter;