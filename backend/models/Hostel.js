const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["Boys", "Girls", "Mixed"], required: true },
  totalRooms: { type: Number, default: 0 },
  floors: { type: Number, default: 1 },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Hostel", hostelSchema);
