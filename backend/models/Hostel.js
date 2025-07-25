// models/Hostel.js
const mongoose = require('mongoose');

// Bed Schema (sub-document)
const BedSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  bedNumber: { type: Number, required: true },
  isOccupied: { type: Boolean, default: false },
  studentId: { type: String, default: null }, // Reference to Student ID
});

// Room Schema (sub-document)
const RoomSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, sparse: true},
  roomNumber: { type: String, required: true },
  isAC: { type: Boolean, default: false },
  hasTable: { type: Boolean, default: false }, // Consistent with frontend's hasTable
  beds: [BedSchema], // Array of beds within the room
});

// Floor Schema (sub-document)
const FloorSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  floorNumber: { type: Number, required: true },
  rooms: [RoomSchema], // Array of rooms on the floor
});

// Hostel Schema (main document)
const HostelSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Unique ID for the hostel
  name: { type: String, required: true, unique: true }, // Hostel name must be unique
  floors: [FloorSchema], // Array of floors in the hostel
});

module.exports = mongoose.model('Hostel', HostelSchema);