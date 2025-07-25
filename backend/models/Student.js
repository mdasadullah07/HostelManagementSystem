// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  roomNumber: String,
  bedNumber: Number,
});

module.exports = mongoose.model('Student', studentSchema);
