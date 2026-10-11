// This file is responsible for connecting the Express app to MongoDB.
// It reads the database URL from the environment variables and establishes the connection.

const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

// MongoDB connection string from the environment file
const url = process.env.MONGO_URL;

// Connect to MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error(e);
    process.exit(1); // If the connection fails, stop the app to prevent running without a database
  }
};

module.exports = connectDB;
