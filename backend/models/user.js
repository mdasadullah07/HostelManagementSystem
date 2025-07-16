// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "Warden", "Guard", "Student"],
      required: true,
    },
    schoolId: String,
    sessionId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
