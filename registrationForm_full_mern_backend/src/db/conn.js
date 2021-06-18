const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/RegistrationDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connection to mongodb successfull");
  })
  .catch((err) => {
    console.log("Connection to mongodb not successfull");
  });

//NOW REQUIRE THIS FILE IN APP.JS
