const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
