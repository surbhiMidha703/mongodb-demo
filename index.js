const mongoose = require("mongoose");

//first time the db is automatically created if that does not exists
// in real world app the connection string should come from config file
//return promise
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to mongoDB"))
  .catch((e) => console.error("could not connect to DB", e));
