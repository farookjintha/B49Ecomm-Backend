const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["MALE", "FEMALE", "NOT TO DISCLOSE"],
  },
  role: {
    type: Number,
    enum: [0, 1, 2, 3],
    default: 2,
  },
});

module.exports = mongoose.model("Users", userSchema);

// ROLES:
// admin: 0
// seller: 1
// user: 2
// privileged_user: 3
