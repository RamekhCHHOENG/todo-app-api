const express = require("express");
const mongoose = require("mongoose");

const app = express();

// connection to mongodb
const uri = process.env.MONGODB_URI || "mongodb://localhost/todo_express"
console.log(uri)
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // add this line to parse request body as JSON
app.use(express.static("public"));
app.set("view engine", "ejs");

// routes
app.use(require("./routes"));
app.use(require("./routes/todo"));

// server configurations....
app.listen(3000, () => console.log("Server started listening on port: 3000"));
