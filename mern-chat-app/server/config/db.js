const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoMemoryServer = null;

const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      console.log('⚡ No MONGO_URI specified. Starting MongoMemoryServer (In-Memory Database)...');
      mongoMemoryServer = await MongoMemoryServer.create();
      mongoUri = mongoMemoryServer.getUri();
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host} (${mongoMemoryServer ? 'In-Memory DB' : 'External DB'})`);
  } catch (error) {
    console.warn(`⚠️ Primary MongoDB Connection failed: ${error.message}. Falling back to In-Memory Database...`);
    try {
      mongoMemoryServer = await MongoMemoryServer.create();
      const fallbackUri = mongoMemoryServer.getUri();
      const conn = await mongoose.connect(fallbackUri);
      console.log(`✅ MongoDB Fallback Connected: ${conn.connection.host}`);
    } catch (fallbackError) {
      console.error(`❌ MongoDB connection error: ${fallbackError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
