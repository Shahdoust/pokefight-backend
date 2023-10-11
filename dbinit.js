const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URL);
  console.log(`MongoDb connected: ${conn.connection.name}`.underline.cyan);
};

module.exports = connectDB;
