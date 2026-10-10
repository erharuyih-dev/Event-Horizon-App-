const mongoose = require("mongoose");
const connectDB = require("../configs/db");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Enter your First Name"],
    },
    lastName: {
      type: String,
      required: [true, "Enter your Last Name"],
    },
    email: {
      type: String,
      required: [true, "enter a valid email address"],
      unique: [true, "this email already exixts"],
    },
    password: {
      type: String,
      required: [true, "enter a strong password"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
