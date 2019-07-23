var mongoose = require("mongoose");

var form = new mongoose.Schema({
  _id: Number,
  name: String,
  numSubmissions: Number,
  formFields: {
    type: Array
    // array of {name, type}
  },
  submissions: [mongoose.Schema.Types.Mixed] //[{fieldName: value,...},...]
});

module.exports = mongoose.model("form", form);
