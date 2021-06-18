require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
var fs = require("fs");
require("./db/conn");
// const hbs = require('hbs');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
var multer = require("multer");

const Register = require("./models/registers");
const auth = require("./middileware/auth");

const port = process.env.PORT || 3003;

//Make app understand json
//if we are working on POSTMAN , then this single line code below is enuf.

app.use(express.json());
//but as we are using front end form, not postman, we have to add this below line of code also:
app.use(express.urlencoded({ extended: false }));

//For static webpages we made initially
app.use(express.static(path.join(__dirname, "../public")));

//Defining Template Engine
app.set("view engine", "hbs");

//use this if you change views directory path to --> templates/views
// app.set("views", path.join(__dirname,"../templates/views"));

//if we are using partials ---> templates/partials, we have to register it
// require hbs
// hbs.registerParials( path.join(__dirname,"../templates/partials"));

// Set up storage Engine for Multer
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/uploads ");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

//Routes

// app.get("/", (req, res) => {
//   res.render("index");
// });

app.get("/", (req, res) => {
  Register.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.render("index", { items: items });
    }
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

//JWT AUTHENTICATION FOR LOGINSUCESS ROUTE PAGE
app.get("/loginsuccess", auth, (req, res) => {
  res.render("loginsuccess");
});

//REGISTER
app.post("/", upload.single("image"), async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (password === cpassword) {
      const registerEmployee = new Register({
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
        about: req.body.about,
        profilepic: {
          data: fs.readFileSync(
            path.join(__dirname + "/uploads/" + req.file.filename)
          ),
          contentType: "image/png",
        },
        // gender: req.body.gender,
        // city: req.body.city,
      });

      // using JWT
      const token = await registerEmployee.generateAuthToken();

      // ADDING TOKEN TO COOKIE

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 30000),
        httpOnly: true,
      });

      const result = await registerEmployee.save();
      res.render("login");
    } else {
      res.send("Passwords Do Not Matching");
    }
  } catch (err) {
    res.send(err);
  }
});

//LOGIN ROUTE

app.post("/login", async (req, res) => {
  try {
    //to get what email user has entered in login form
    // copy whatever you have added in name attribute of email in form
    // req.body.<paste name attribute here>
    const email = req.body.email;

    // similarily get the password user entered in login form
    // use same name as name attribute
    const password = req.body.password;
    // console.log(email);
    // console.log(password);

    const useremail = await Register.findOne({ email: email });

    // console.log(useremail);
    // console.log(useremail.password);

    // BCRYPT -- MATCH WITH HASHED PASSWORD
    const isMatch = await bcrypt.compare(password, useremail.password);

    // JWT
    const token = await useremail.generateAuthToken();
    console.log(token);

    if (isMatch) {
      //if login sucess go here
      res.render("loginsuccess");
    } else {
      res.send("Invalid email or password");
    }
  } catch {
    res.status(400).send("Invalid Login details");
  }
});

//Listening to server
app.listen(port, () => {
  console.log(`server running successfully at ${port}`);
});
