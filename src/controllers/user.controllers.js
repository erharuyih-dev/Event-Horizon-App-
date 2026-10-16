// this controller handles user signup and login functionality
// const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

// this function handles user signup( creating a new user profile and encrpts the password before saving it to the database)
const signUp = async (req, res) => {
  const { firstName, otherNames, lastName, email, password } = req.body;

  try {
    if (!firstName || !otherNames || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const encryptPassword = await bcrypt.hash(password, 10);

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "profile already exist" });
    }

    const newUser = await User.create({
      firstName,
      otherNames,
      lastName,
      email,
      password: encryptPassword,
    });

    return res
      .status(201)
      .json({ message: "signup successfully done", newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
// this function handles user login (verifies the user credentials and returns a success message if the credentials are valid)
const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Enter email and password" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ message: "Login successful", user: user, token: token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { signUp, logIn };
