const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: String,
  beds: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        default: null
      }
    }
  ]
});

const floorSchema = new mongoose.Schema({
  floorNumber: Number,
  rooms: [roomSchema]
});

const hostelSchema = new mongoose.Schema({
  name: String,
  floors: [floorSchema]
});

module.exports = mongoose.model('Hostel', hostelSchema);
