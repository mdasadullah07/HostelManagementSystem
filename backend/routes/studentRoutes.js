// routes/studentRoutes.js or inside server.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Create
router.post('/students', async (req, res) => {
  const newStudent = new Student(req.body);
  const saved = await newStudent.save();
  res.json(saved);
});

// Read All
router.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Update
router.put('/students/:id', async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
