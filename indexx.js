const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDBB = require("../backend/srcs/configss/db");
const router = require("../backend/srcs/routess/user.router");

const app = express();
const PORT = process.env.PORT || 8120;

app.use(express.json());

app.get("/home", async (req, res) => {
  res.send("hello world");
});
app.use("/user/v1", router);

connectDBB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
});
