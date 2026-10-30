mongoose = require("mongoose");
const connectDBB = require("../configss/db");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      rquired: true,
      trim: true,
    },

    lastName: {
      type: String,
      rquired: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "enter your password"],
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
