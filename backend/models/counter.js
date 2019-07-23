var mongoose = require("mongoose");

var counter = new mongoose.Schema({
  _id: String,
  count: Number
});

module.exports = mongoose.model("counter", counter);
