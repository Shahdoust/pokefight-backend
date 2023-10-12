const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  wins: {
    type: Number,
    required: true,
  },
  loses: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Result", UserSchema);
