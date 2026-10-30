const dotenv = require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "profile already exists" });
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    return res
      .status(201)
      .json({ message: "Profile created successfully", newUser: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Enter your email and password" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "you have entered a wrong email" });
    }
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res
        .status(400)
        .json({ message: "U have entered a wrong password" });
    }
    // if (user.otp === null) {
    //   return res.status(400).json({ message: "you haven't verified your otp" });
    // }
    if (user.isVerified === false) {
      return res.status(400).json({ message: "you haven't verified your otp" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    user.token = token;

    return res
      .status(201)
      .json({ message: "Login Successful", user: user, token: token });
  } catch (error) {
    return res.status(500).json({ message: "Internaal Server error", error });
  }
};

const sendOtp = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "invalid id" });
    }
    if (user.isVerified === true) {
      user.otp = null;
      user.otpExpiresAt = null;
      return res.status(400).json({ message: "this user is already verified" });
    }

    // Generate a 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000);
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    user.otp = otpCode;
    user.otpExpiresAt = otpExpiresAt;

    await user.save(); // Save the user document, NOT otp

    return res.status(201).json({
      message: "otp generated successfully",
      otp: user.otp,
    });
  } catch (error) {
    console.error(error); // This will print the exact error in your terminal console
    return res.status(500).json({
      message: "Internal Server, failed to generate otp",
      error: error.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  try {
    const user = await User.findOne({ otp: otp });
    // if (!user) {
    //   return res.status(400).json({ message: "user not found" });
    // }
    if (!user) {
      return res.status(400).json({ message: "invalid otp" });
    }
    if (user.isVerified === true) {
      return res.status(400).json({ message: "user is already verified!" });
    }

    if (user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "otp has expired" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    return res.status(201).json({ message: "email verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
module.exports = {
  createUser,
  signIn,
  sendOtp,
  verifyOtp,
};
