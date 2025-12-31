require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const connectDB = require("../connection");
const authMiddleware = require("../middleware/auth");

const pageRoutes = require("../routes/pages");
const userRoutes = require("../routes/user");
const urlRoutes = require("../routes/url");

const Url = require("../models/url");

const app = express();

// DB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Views
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

// Auth
app.use(authMiddleware);

// Routes
app.use("/", pageRoutes);
app.use("/user", userRoutes);
app.use("/url", urlRoutes);

// Redirect short URL
app.get("/:shortid", async (req, res) => {
  const entry = await Url.findOneAndUpdate(
    { shortid: req.params.shortid },
    { $push: { visitHistory: Date.now() } }
  );

  if (!entry) return res.status(404).send("Not found");
  res.redirect(entry.redirectURL);
});

module.exports = app;
