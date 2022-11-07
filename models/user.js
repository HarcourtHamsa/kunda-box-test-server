const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    min: 5,
    max: 16,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
    max: 16,
  },
});

module.exports = mongoose.model("users", UserSchema);
