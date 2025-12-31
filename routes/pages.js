const express = require("express");
const router = express.Router();
const Url = require("../models/url");

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const urls = await Url.find({ createdBy: req.user._id });
  res.render("home", { urls });
});

router.get("/login", (_, res) => res.render("login"));
router.get("/signup", (_, res) => res.render("signup"));

module.exports = router;
