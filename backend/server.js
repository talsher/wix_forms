var app = require("./app");
const mongoose = require("mongoose");

var mongoUrl = process.env.MONGODB_HOST;
mongoose.connect(mongoUrl).catch(err => {
  throw err;
});

const db_connection = mongoose.connection;

db_connection.once("open", () => {
  console.log("connected to mongodb");
});

app.listen(3000, () => console.log("Server running on port 3000"));
