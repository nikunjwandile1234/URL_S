const Url = require("../models/url");
const { nanoid } = require("nanoid");

exports.createUrl = async (req, res) => {
  if (!req.user) return res.redirect("/login");

  await Url.create({
    shortid: nanoid(8),
    redirectURL: req.body.url,
    createdBy: req.user._id
  });

  res.redirect("/");
};
