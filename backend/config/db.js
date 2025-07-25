// config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully!');

    // ✅ Drop problematic index if it exists
    try {
      await mongoose.connection.collection('hostels').dropIndex('floors.rooms.beds.id_1');
      console.log('✅ Duplicate index "floors.rooms.beds.id_1" dropped successfully!');
    } catch (err) {
      if (err.codeName === 'IndexNotFound') {
        console.log('Index not found. Likely already dropped or never created.');
      } else {
        console.log('❌ Error while dropping index:', err.message);
      }
    }

  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit on failure
  }
};

module.exports = connectDB;
