const Hostel = require("../models/Hostel");

// Create
exports.createHostel = async (req, res) => {
  try {
    const hostel = new Hostel(req.body);
    await hostel.save();
    res.status(201).json(hostel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read All
exports.getHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.json(hostels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateHostel = async (req, res) => {
  try {
    const updated = await Hostel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteHostel = async (req, res) => {
  try {
    await Hostel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hostel deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
