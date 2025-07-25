// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// POST new student
router.post('/', async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update student
router.put('/:id', async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all students
router.get('/', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

module.exports = router;
