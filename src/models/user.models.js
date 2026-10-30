mongoose = require("mongoose");
const connectDB = require("../configs/db");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      set: (value) => {
        if (!value) return value;
        // Capitalizes the first letter and leaves the rest as-is
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },

    lastName: {
      type: String,
      required: true,
      set: (value) => {
        if (!value) return value;
        // Capitalizes the first letter and leaves the rest as-is
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
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
