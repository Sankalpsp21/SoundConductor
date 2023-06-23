const mongoose = require("mongoose");
const sampleData = require("../data/sample.json");
const joi = require("joi");

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
});

const audioActionValidSchema = joi.object({
  action: joi.string().required(),
  signal: joi.string().required(),
});

const AudioAction = db.model("AudioAction", audioActionSchema);

// create a new audioaction
const createAudioAction = async (body) => {
  const newAudioAction = {
    action: body.action,
    signal: body.signal,
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
    const audioactions = await AudioAction.find({}).sort({ _id: 1 });
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
    if (!audioaction) {
      return false;
    }
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
  audioActionValidSchema,
  createAudioAction,
  readAudioAction,
  readAudioActions,
  readAudioActionsBySignal,
  updateAudioAction,
  deleteAudioAction,
};
