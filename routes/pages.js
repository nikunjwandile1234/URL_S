const express = require("express");
const router = express.Router();
const Url = require("../models/url");

// HOME (protected)
router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");

  const urls = await Url.find({ createdBy: req.user._id });
  return res.render("home", { urls });
});

// LOGIN PAGE
router.get("/login", (req, res) => {
  return res.render("login");
});

// SIGNUP PAGE
router.get("/signup", (req, res) => {
  return res.render("signup");
});

module.exports = router;
