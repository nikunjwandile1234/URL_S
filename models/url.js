const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortid: String,
  redirectURL: String,
  visitHistory: [Number],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Url", urlSchema);
