const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// GET all students
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// POST new student
router.post("/", async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.status(201).json(newStudent);
});

// PUT update student
router.put("/:id", async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// DELETE student
router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
