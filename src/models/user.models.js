const mongoose = require("mongoose");
const connectDB = require("../configs/db");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Enter your First Name"],
      trim: true,
      set: (value) =>
        value ? value.replace(/\b\w/g, (char) => char.toUpperCase()) : value,
    },
    otherNames: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Enter your Last Name"],
      trim: true,
      set: (value) =>
        value ? value.replace(/\b\w/g, (char) => char.toUpperCase()) : value,
    },
    email: {
      type: String,
      required: [true, "enter a valid email address"],
      unique: [true, "this email already exixts"],
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      lowercase: true,
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
