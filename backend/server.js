const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Required to parse JSON request bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', async () => {
  console.log('MongoDB connected successfully!');

  // ✅ Drop duplicate index for nested beds.id field
  try {
    console.log('Checking and dropping problematic index...');
    await mongoose.connection.collection('hostels').dropIndex('floors.rooms.beds.id_1');
    console.log('✅ Duplicate index "floors.rooms.beds.id_1" dropped successfully!');
  } catch (err) {
    if (err.codeName === 'IndexNotFound') {
      console.log('Index already removed or never existed.');
    } else {
      console.log('Error while dropping index:', err.message);
    }
  }
});

// Routes
const hostelRoutes = require('./routes/hostelRoutes');
const studentRoutes = require('./routes/studentRoutes');

app.use('/api/hostels', hostelRoutes);
app.use('/api/students', studentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
