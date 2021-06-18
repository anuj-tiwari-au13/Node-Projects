const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Define Schema

const employeeSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  about: {
    type: Number,
    required: true,
    unique: true,
  },
  //   age: {
  //     type: Number,
  //     required: true,
  //   },
  //   gender: {
  //     type: String,
  //     required: true,
  //   },
  //   city: {
  //     type: String,
  //     required: true,
  //   },
  profilepic: {
    data: Buffer,
    contentType: String,
  },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
});

// using JWT
employeeSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    res.send(err);
  }
};

// BCRYPT MIDDLEWARE

employeeSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log(`current password is ${this.password}`);

    this.password = await bcrypt.hash(this.password, 10);

    console.log(`hashed password is ${this.password}`);

    this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10);
  }
  next();
});

//Collection create

const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;
