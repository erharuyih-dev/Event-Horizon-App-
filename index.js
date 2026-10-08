const dotenv = require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const connectDB = require("../backend/src/configs/db");
const router = require("../backend/src/routes/user.routes");
const app = express();

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("api/v1/user", router);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
