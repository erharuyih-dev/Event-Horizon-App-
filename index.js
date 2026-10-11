// This is the main entry file of the backend application.
// It starts the Express server, loads middleware, and connects to MongoDB.

const dotenv = require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const connectDB = require("./src/configs/db");
const router = require("./src/routes/user.routes");
const app = express();

// Port for the server; default is 1800 if not set in the environment
const PORT = process.env.PORT || 1800;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to log HTTP requests in development mode
app.use(morgan("dev"));

// Basic home route for testing the app
app.get("/", (req, res) => {
  try {
    console.log("hello world");
  } catch (e) {
    console.log(e);
  }
});

// Mount all user routes under /api/v1
app.use("/api/v1", router);

// Connect to MongoDB before starting the server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });
});
