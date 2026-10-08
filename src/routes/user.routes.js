const express = require("express");
const router = express.Router();
const signUp = require("../controllers/user.controllers");

router.post("/signup", signUp);
module.exports = router;
