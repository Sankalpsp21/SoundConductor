const mongoose = require("mongoose");
const sampleData = require("../data/sample.json");

const db = mongoose.connection.useDb("AtlasMadness");

const audioActionSchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  signal: {
    type: String,
    required: true,
  },
  rawdata: {
    type: String,
    required: true,
    default: "something.wav",
  },
});

module.exports = audioActionSchema;

const AudioAction = db.model("AudioAction", audioActionSchema);

// create a new audioaction
const createAudioAction = async (body) => {
  // sample data
  const sampleBody = sampleData[3];

  const newAudioAction = {
    action: sampleBody.action,
    signal: sampleBody.signal,
    rawdata: sampleBody.rawdata,
  };

  try {
    const audioaction = new AudioAction(newAudioAction);
    await audioaction.save();
    console.log(
      `New audioaction Data is successfully saved ==: ${audioaction._id}`
    );
    return audioaction._id;
  } catch (err) {
    console.error(" == error:", err);
    return null;
  }
};

// get all audioactions
const readAudioActions = async () => {
  try {
    const audioactions = await AudioAction.find();
    console.log(
      `New audioaction Data is successfully returned ==: ${audioactions}`
    );
    return audioactions;
  } catch (err) {
    console.error(" == error:", err);
    return null;
  }
};

// get a specific audioaction
const readAudioAction = async (id) => {
  try {
    const audioaction = await AudioAction.findById(id);
    console.log(
      `New audioaction Data is successfully returned ==: ${audioaction}`
    );
    return audioaction;
  } catch (err) {
    console.error(" == error:", err);
    return null;
  }
};

// find all audioactions by signal
const readAudioActionsBySignal = async (signal) => {
  try {
    const audioactions = await AudioAction.find({ signal: signal });
    console.log(
      `New audioaction Data is successfully returned ==: ${audioactions}`
    );
    return audioactions;
  } catch (err) {
    console.error(" == error:", err);
    return null;
  }
};

// update a specific audioaction
const updateAudioAction = async (body, id) => {
  try {
    const audioaction = await AudioAction.findById(id);
    audioaction.set(body);
    await audioaction.save();
    console.log(
      `New audioaction Data is successfully updated ==: ${audioaction}`
    );
    return true;
  } catch (err) {
    console.error(" == error:", err);
    return false;
  }
};

// delete a specific audioaction
const deleteAudioAction = async (id) => {
  try {
    await AudioAction.findByIdAndDelete(id);
    console.log(`New audioaction Data is successfully deleted ==`);
    return true;
  } catch (err) {
    console.error(" == error:", err);
    return false;
  }
};

module.exports = {
  createAudioAction,
  readAudioAction,
  readAudioActions,
  readAudioActionsBySignal,
  updateAudioAction,
  deleteAudioAction,
};
