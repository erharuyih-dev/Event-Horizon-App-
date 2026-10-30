const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const url = process.env.DB_URL;

const connectDBB = async () => {
  try {
    await mongoose.connect(url);
    console.log("database connected");
  } catch (e) {
    console.log(e);
  }
};

module.exports = connectDBB;
