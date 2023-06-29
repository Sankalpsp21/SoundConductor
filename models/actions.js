// Right now, just ignore this file

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const joi = require("joi");

const db = mongoose.connection.useDb("AtlasMadness");

const actionSchema = new mongoose.Schema({
  userId: { type: ObjectId, required: true },
  category: { type: String, required: true },
  devices: [
    {
      deviceId: { type: String, required: true },
      state: { type: String, required: true },
    },
  ],
});

const actionValidSchema = joi.object({
  userId: joi.required(),
  category: joi.string().required(),
  devices: joi.array().items(
    joi.object({
      deviceId: joi.string().required(),
      state: joi.string().required(),
    })
  ),
});

const Action = db.model("Actions", actionSchema);

module.exports = {
  actionValidSchema,
};
