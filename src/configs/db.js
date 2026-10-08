const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (e) {
    console.error(e);
    process.exit(1); //dis is used to log errors and closes the application
  }
};
module.exports = connectDB;
