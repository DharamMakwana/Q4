const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const config = require("./config");
const middleware = require("./middleware");
const path = require("path");

const app = express();

// Database connection
mongoose
  .connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(
  session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true,
  })
);

// Set the view engine to EJS
app.set("view engine", "ejs");

// Set the directory to serve your static files such as html/css/js/images/fonts
app.use(express.static("views"));

// Set up routes
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/students", middleware.checkAuth, studentRoutes);
app.use("/auth", authRoutes);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
