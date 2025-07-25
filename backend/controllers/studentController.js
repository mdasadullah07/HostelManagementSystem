// controllers/studentController.js
const Student = require('../models/Student');
const Hostel = require('../models/Hostel'); // Needed for unassigning students from beds

// Helper to update bed in hostel document when student is unassigned (similar to one in hostelController)
const updateBedInHostel = async (studentIdToUnassign) => {
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
        await hostel.save();
    }
};


// @route   GET /api/students
// @desc    Get All Students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json(students);
  } catch (err) {
    console.error('Error in getAllStudents:', err.message);
    res.status(500).json({ message: 'Error fetching students', error: err.message });
  }
};

// @route   POST /api/students
// @desc    Add New Student
exports.addStudent = async (req, res) => {
  const { name, course } = req.body;
  if (!name || !course) {
    return res.status(400).json({ message: 'Student name and course are required.' });
  }

  try {
    const newStudentId = `S${Date.now()}`;
    const newStudent = new Student({
      id: newStudentId,
      name,
      course,
      roomNumber: null,
      bedNumber: null,
    });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    console.error('Error in addStudent:', err.message);
    res.status(500).json({ message: 'Error adding student', error: err.message });
  }
};

// @route   PUT /api/students/:studentId
// @desc    Update Student
exports.updateStudent = async (req, res) => {
  const { studentId } = req.params;
  const { name, course } = req.body;

  try {
    const student = await Student.findOne({ id: studentId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    student.name = name || student.name;
    student.course = course || student.course;

    await student.save();
    res.status(200).json(student);
  } catch (err) {
    console.error('Error in updateStudent:', err.message);
    res.status(500).json({ message: 'Error updating student', error: err.message });
  }
};

// @route   DELETE /api/students/:studentId
// @desc    Delete Student
exports.deleteStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findOne({ id: studentId });
    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    // If student is assigned, unassign them from the bed first
    if (student.roomNumber && student.bedNumber) {
        await updateBedInHostel(studentId); // Use the helper
    }

    await Student.deleteOne({ id: studentId });
    res.status(200).json({ message: 'Student deleted successfully.' });
  } catch (err) {
    console.error('Error in deleteStudent:', err.message);
    res.status(500).json({ message: 'Error deleting student', error: err.message });
  }
};