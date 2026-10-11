// This controller handles user registration and login logic.
// It receives requests from the route layer and interacts with the User model in MongoDB.

const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user.models");

// Register a new user
const signUp = async (req, res) => {
  // Extract incoming form data from the request body
  const { firstName, lastName, email, password } = req.body;

  try {
    // Validate that all required fields were provided
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check whether a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "profile already exist" });
    }

    // Create the user in the database
    const newUser = await User.create({ firstName, lastName, email, password });

    // Send a success response after signup
    return res
      .status(201)
      .json({ message: "signup successfully done", newUser });
  } catch (error) {
    // Handle unexpected server errors
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Log in an existing user
const logIn = async (req, res) => {
  // Extract credentials from request body
  const { email, password } = req.body;

  try {
    // Validate email and password are present
    if (!email || !password) {
      return res.status(400).json({ message: "Enter email and password" });
    }

    // Look for the user by email
    const user = await User.findOne({ email });

    // If user does not exist or password is wrong, reject login
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Return the logged-in user details if credentials are correct
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    // Handle database or server errors
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { signUp, logIn };
