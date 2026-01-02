const User = require("../models/user");
const jwt = require("jsonwebtoken");

// SIGNUP
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({ name, email, password });
  return res.redirect("/login");
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", { error: "Invalid email or password" });
  }

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET
  );

  res.cookie("uid", token, {
    httpOnly: true,
    sameSite: "lax",
  });

  return res.redirect("/");
};

// LOGOUT ✅
exports.logout = (req, res) => {
  res.clearCookie("uid");
  return res.redirect("/login");
};
