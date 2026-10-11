// This file defines the structure of the User collection in MongoDB.
// It tells Mongoose what fields the user document should contain.

const mongoose = require("mongoose");
const connectDB = require("../configs/db");
const Schema = mongoose.Schema;

// Create the user schema with required fields and validation rules
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
    timestamps: true, // Adds createdAt and updatedAt automatically
    versionKey: false, // Removes the __v field from documents
  },
);

// Convert the schema into a MongoDB model called User
const User = mongoose.model("User", userSchema);

module.exports = User;
