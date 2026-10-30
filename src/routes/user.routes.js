const express = require("express");
const {
  createUser,
  signIn,
  sendOtp,
  verifyOtp,
} = require("../controllers/user.controllers");
const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", signIn);
router.post("/sendotp/:id", sendOtp);
router.post("/verifyotp", verifyOtp);
module.exports = router;
