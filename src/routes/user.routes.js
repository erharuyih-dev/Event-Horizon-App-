const express = require("express");
const {
  createUser,
  signIn,
  sendOtp,
  verifyOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
} = require("../controllers/user.controllers");
const router = express.Router();

router.post("/signup", createUser);
router.post("/signin", signIn);
router.post("/sendotp/:id", sendOtp);
router.post("/resendotp/:id", resendOtp);
router.post("/verifyotp", verifyOtp);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);
module.exports = router;
