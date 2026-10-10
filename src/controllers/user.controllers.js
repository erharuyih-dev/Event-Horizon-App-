const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user.models");

const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "profile already exists", user });
    }
    const newUser = await User.create({ firstName, lastName, email, password });
    return res
      .status(201)
      .json({ message: "signup successfully done", newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Enter email and password" });
    }
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { signUp, logIn };
