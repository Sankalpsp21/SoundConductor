const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://mingbab33:wp3wkdldirl@explore.uofhixr.mongodb.net/?retryWrites=true&w=majority";
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
