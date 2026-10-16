const dotenv = require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./src/configs/db");
const router = require("./src/routes/user.routes");
const app = express();

const PORT = process.env.PORT || 1800;

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  try {
    console.log("hello world");
  } catch (e) {
    console.log(e);
  }
});

app.use("/api/v1", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
});
