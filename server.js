require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 8000;
const mongoURI = process.env.MONGO_URI;
const {
  createAudioAction,
  readAudioAction,
  readAudioActions,
  readAudioActionsBySignal,
  updateAudioAction,
  deleteAudioAction,
} = require("./models/AudioAction");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Database Connection
mongoose.set("strictQuery", false);
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Database Connected`);
  })
  .catch((err) => {
    console.log(`Database Connection Failed: ${err}`);
  })
  .finally(() => {
    mongoose.connection.useDb("sample");
    app.listen(PORT, () => {
      console.log("== Server is running on port ", PORT);
      // Check Create Function
      // createAudioAction();

      // Check Read function
      // readAudioActions();
      // readAudioAction("6493e71c8db780832a189f63");
      // readAudioActionsBySignal("clap twice");

      // Check Update function
      // updateAudioAction({ signal: "screaming" }, "6493dcbe7bac697f5c131c7b");

      // Check Delete function
      // deleteAudioAction("6493e71c8db780832a189f63");
    });
  });
