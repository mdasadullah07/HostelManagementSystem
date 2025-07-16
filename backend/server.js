const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ Mongo Error: ", err));

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);

// Serve frontend (React build)
const frontendPath = path.join(__dirname, "../frontend/build");
app.use(express.static(frontendPath));

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from Backend 🔥" });
});

const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

const hostelRoutes = require("./routes/hostelRoutes");
app.use("/api/hostels", hostelRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
