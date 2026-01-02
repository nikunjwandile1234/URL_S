const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
} = require("../controllers/user");

router.post("/", signup);
router.post("/login", login);
router.get("/logout", logout); // ✅ LOGOUT ROUTE

module.exports = router;
