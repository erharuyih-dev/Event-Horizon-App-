// This file defines the API routes for user-related actions.
// It connects URL endpoints to controller functions.

const express = require("express");
const router = express.Router();
const { signUp, logIn } = require("../controllers/user.controllers");

// Route for creating a new user account
router.post("/signup", signUp);

// Route for logging in an existing user
router.post("/login", logIn);

module.exports = router;
