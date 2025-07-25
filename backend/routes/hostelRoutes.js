// routes/hostelRoutes.js
const express = require('express');
const router = express.Router();
const hostelController = require('../controllers/hostelController');

// @route   GET /api/hostels
// @desc    Get all hostels
router.get('/', hostelController.getAllHostels);

// @route   POST /api/hostels
// @desc    Add new hostel
router.post('/', hostelController.addHostel); // This route uses the addHostel controller function

// Add/Edit room within a hostel floor
router.post('/:hostelId/floors/:floorNumber/rooms', hostelController.manageRoom);

// Delete room
router.delete('/:hostelId/floors/:floorNumber/rooms/:roomId', hostelController.deleteRoom);

// Update bed occupancy (assign/unassign student)
router.put('/:hostelId/floors/:floorNumber/rooms/:roomId/beds/:bedId', hostelController.updateBedOccupancy);

module.exports = router;