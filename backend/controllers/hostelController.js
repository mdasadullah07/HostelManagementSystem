// controllers/hostelController.js
const Hostel = require('../models/Hostel');
const Student = require('../models/Student'); // Needed for unassigning students

// Helper to unassign a student from a bed (used internally by other controllers)
const unassignStudentFromBedInternal = async (studentIdToUnassign) => {
    const student = await Student.findOne({ id: studentIdToUnassign });
    if (student) {
        student.roomNumber = null;
        student.bedNumber = null;
        await student.save();

        // Also update the bed in the hostel document
        const hostel = await Hostel.findOne({ 'floors.rooms.beds.studentId': studentIdToUnassign });
        if (hostel) {
            hostel.floors.forEach(floor => {
                floor.rooms.forEach(room => {
                    room.beds.forEach(bed => {
                        if (bed.studentId === studentIdToUnassign) {
                            bed.isOccupied = false;
                            bed.studentId = null;
                        }
                    });
                });
            });
            await hostel.save(); // Save the hostel after updating the bed
        }
    }
};


// @route   GET /api/hostels
// @desc    Get All Hostels
exports.getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find({});
    res.status(200).json(hostels);
  } catch (err) {
    console.error('Error in getAllHostels:', err.message);
    res.status(500).json({ message: 'Error fetching hostels', error: err.message });
  }
};

// @route   POST /api/hostels
// @desc    Add New Hostel
exports.addHostel = async (req, res) => {
  const { name, numberOfFloors } = req.body;
  if (!name || numberOfFloors === undefined || numberOfFloors < 1) {
    return res.status(400).json({ message: 'Hostel name and valid number of floors are required.' });
  }

  try {
    const existingHostel = await Hostel.findOne({ name });
    if (existingHostel) {
      return res.status(409).json({ message: 'Hostel with this name already exists.' });
    }

    const newHostelId = `H${Date.now()}`;
    const floors = Array.from({ length: numberOfFloors }, (_, i) => ({
      id: `F${newHostelId}-${i + 1}`,
      floorNumber: i + 1,
      rooms: [],
    }));

    const newHostel = new Hostel({
      id: newHostelId,
      name,
      floors,
    });

    await newHostel.save();
    res.status(201).json(newHostel);
  } catch (err) {
    console.error('Error in addHostel:', err.message);
    res.status(500).json({ message: 'Error adding hostel', error: err.message });
  }
};

// @route   POST /api/hostels/:hostelId/floors/:floorNumber/rooms
// @desc    Add/Edit Room within a Hostel Floor
exports.manageRoom = async (req, res) => {
  const { hostelId, floorNumber } = req.params;
  const { roomId, roomNumber, numberOfBeds, isAC, hasTable } = req.body;

  if (!roomNumber || numberOfBeds === undefined || numberOfBeds < 1) {
    return res.status(400).json({ message: 'Room number and valid number of beds are required.' });
  }

  try {
    const hostel = await Hostel.findOne({ id: hostelId });
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found.' });
    }

    const floor = hostel.floors.find(f => f.floorNumber === parseInt(floorNumber));
    if (!floor) {
      return res.status(404).json({ message: 'Floor not found.' });
    }

    if (roomId) { // Editing existing room
      const roomIndex = floor.rooms.findIndex(r => r.id === roomId);
      if (roomIndex === -1) {
        return res.status(404).json({ message: 'Room not found.' });
      }

      const isDuplicate = floor.rooms.some(r => r.roomNumber === roomNumber && r.id !== roomId);
      if (isDuplicate) {
        return res.status(409).json({ message: `Room number "${roomNumber}" already exists on this floor.` });
      }

      const existingRoom = floor.rooms[roomIndex];
      const oldBedCount = existingRoom.beds.length;

      if (numberOfBeds < oldBedCount) {
        const bedsToRemove = existingRoom.beds.slice(numberOfBeds);
        for (const bed of bedsToRemove) {
          if (bed.isOccupied && bed.studentId) {
            await unassignStudentFromBedInternal(bed.studentId);
          }
        }
      }

      const newBeds = Array.from({ length: numberOfBeds }, (_, i) => {
        const existingBed = existingRoom.beds.find(b => b.bedNumber === (i + 1));
        return existingBed || { id: `B${existingRoom.id}-${i + 1}`, bedNumber: i + 1, isOccupied: false, studentId: null };
      });

      existingRoom.roomNumber = roomNumber;
      existingRoom.isAC = isAC;
      existingRoom.hasTable = hasTable;
      existingRoom.beds = newBeds;

      await hostel.save();
      res.status(200).json(existingRoom);
    } else { // Adding new room
      const isDuplicate = floor.rooms.some(r => r.roomNumber === roomNumber);
      if (isDuplicate) {
        return res.status(409).json({ message: `Room number "${roomNumber}" already exists on this floor.` });
      }

      const newRoomId = `R${Date.now()}`;
      const beds = Array.from({ length: numberOfBeds }, (_, i) => ({
        id: `B${newRoomId}-${i + 1}`,
        bedNumber: i + 1,
        isOccupied: false,
        studentId: null,
      }));

      const newRoom = {
        id: newRoomId,
        roomNumber,
        isAC,
        hasTable,
        beds,
      };
      floor.rooms.push(newRoom);
      await hostel.save();
      res.status(201).json(newRoom);
    }
  } catch (err) {
    console.error('Error in manageRoom:', err.message);
    res.status(500).json({ message: 'Error managing room', error: err.message });
  }
};

// @route   DELETE /api/hostels/:hostelId/floors/:floorNumber/rooms/:roomId
// @desc    Delete Room
exports.deleteRoom = async (req, res) => {
  const { hostelId, floorNumber, roomId } = req.params;

  try {
    const hostel = await Hostel.findOne({ id: hostelId });
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found.' });
    }

    const floor = hostel.floors.find(f => f.floorNumber === parseInt(floorNumber));
    if (!floor) {
      return res.status(404).json({ message: 'Floor not found.' });
    }

    const roomIndex = floor.rooms.findIndex(r => r.id === roomId);
    if (roomIndex === -1) {
      return res.status(404).json({ message: 'Room not found.' });
    }

    const roomToDelete = floor.rooms[roomIndex];

    for (const bed of roomToDelete.beds) {
      if (bed.isOccupied && bed.studentId) {
        await unassignStudentFromBedInternal(bed.studentId);
      }
    }

    floor.rooms.splice(roomIndex, 1);
    await hostel.save();
    res.status(200).json({ message: 'Room deleted successfully.' });
  } catch (err) {
    console.error('Error in deleteRoom:', err.message);
    res.status(500).json({ message: 'Error deleting room', error: err.message });
  }
};

// @route   PUT /api/hostels/:hostelId/floors/:floorNumber/rooms/:roomId/beds/:bedId
// @desc    Update Bed Occupancy (Assign/Unassign Student)
exports.updateBedOccupancy = async (req, res) => {
  const { hostelId, floorNumber, roomId, bedId } = req.params;
  const { isOccupied, studentId } = req.body;

  try {
    const hostel = await Hostel.findOne({ id: hostelId });
    if (!hostel) {
      return res.status(404).json({ message: 'Hostel not found.' });
    }

    const floor = hostel.floors.find(f => f.floorNumber === parseInt(floorNumber));
    if (!floor) {
      return res.status(404).json({ message: 'Floor not found.' });
    }

    const room = floor.rooms.find(r => r.id === roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found.' });
    }

    const bed = room.beds.find(b => b.id === bedId);
    if (!bed) {
      return res.status(404).json({ message: 'Bed not found.' });
    }

    if (isOccupied && studentId) { // Assign
      const student = await Student.findOne({ id: studentId });
      if (!student) {
        return res.status(404).json({ message: 'Student not found.' });
      }
      if (student.roomNumber || student.bedNumber) {
        // Unassign student from previous bed if they were assigned
        await unassignStudentFromBedInternal(studentId);
      }
      student.roomNumber = room.roomNumber;
      student.bedNumber = bed.bedNumber;
      await student.save();
    } else if (!isOccupied && bed.studentId) { // Unassign
      await unassignStudentFromBedInternal(bed.studentId);
    }

    bed.isOccupied = isOccupied;
    bed.studentId = studentId;

    await hostel.save();
    res.status(200).json(bed);
  } catch (err) {
    console.error('Error in updateBedOccupancy:', err.message);
    res.status(500).json({ message: 'Error updating bed occupancy', error: err.message });
  }
};