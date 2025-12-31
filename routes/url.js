const express = require("express");
const router = express.Router();
const { createUrl } = require("../controllers/url");

router.post("/", createUrl);

module.exports = router;
