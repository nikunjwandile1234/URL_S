const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  await User.create(req.body);
  res.redirect("/login");
};

exports.login = async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) return res.render("login", { error: "Invalid credentials" });

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET
  );

  res.cookie("uid", token);
  res.redirect("/");
};
