const express = require('express');
const router = express.Router();
const Hostel = require('../models/Hostel');
const Student = require('../models/Student');

// Get all hostels
router.get('/', async (req, res) => {
  const hostels = await Hostel.find();
  res.json(hostels);
});

// Add a new hostel
router.post('/', async (req, res) => {
  const hostel = new Hostel({ name: req.body.name, floors: [] });
  await hostel.save();
  res.json(hostel);
});

// Add a room to a hostel floor
router.post('/:hostelId/floors/:floorNumber/rooms', async (req, res) => {
  const { hostelId, floorNumber } = req.params;
  const { roomNumber } = req.body;

  const hostel = await Hostel.findById(hostelId);
  if (!hostel) return res.status(404).json({ message: 'Hostel not found' });

  let floor = hostel.floors.find(f => f.floorNumber == floorNumber);
  if (!floor) {
    floor = { floorNumber, rooms: [] };
    hostel.floors.push(floor);
  }

  floor.rooms.push({ roomNumber, beds: [] });
  await hostel.save();
  res.json(hostel);
});

// Assign student to a room
router.post('/assign/:roomId', async (req, res) => {
  const { studentId } = req.body;
  const { roomId } = req.params;

  const hostel = await Hostel.findOne({ 'floors.rooms._id': roomId });
  if (!hostel) return res.status(404).json({ message: 'Room not found' });

  for (let floor of hostel.floors) {
    const room = floor.rooms.id(roomId);
    if (room) {
      room.beds.push({ studentId });
      await hostel.save();
      await Student.findByIdAndUpdate(studentId, { assignedRoomId: roomId });
      return res.json({ message: 'Student assigned successfully' });
    }
  }

  res.status(400).json({ message: 'Assignment failed' });
});

module.exports = router;
