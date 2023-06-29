const mongoose = require("mongoose");
const sampleData = require("../data/sample.json");
const joi = require("joi");

const db = mongoose.connection.useDb("AtlasMadness");

const integrationsSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true
    },
    integrationName: {
      type: String,
      required: true
    },
    signal: {
      type: String,
      required: true
    },
    actions: {
      smartthings: {
        devices: [
          {
            deviceId: {
              type: String,
              required: true
            },
            action: {
              type: String,
              required: true
            }
          }
        ]
      }
    }
  });


  const integrationValidSchema = joi.object({
    userId: joi.string().required(),
    integrationName: joi.string().required(),
    signal: joi.string().required(),
    actions: joi.object({
      smartthings: joi.object({
        devices: joi.array().items(
          joi.object({
            deviceId: joi.string().required(),
            action: joi.string().required()
          })
        )
      })
    })
  });

const Integration = db.model("Integrations", integrationsSchema);

// create a new integration
const createIntegration = async (body) => {
  const newIntegration = {
    userId: body.userId,
    integrationName: body.integrationName,
    signal: body.signal,
    actions: body.actions
  };

  try {
    const integration = new Integration(newIntegration);
    await integration.save();
    console.log(
      `New integration Data is successfully saved ==: ${integration._id}`
    );
    return integration._id;
  } catch (err) {
    console.error(" == error:", err);
    return null;
  }
};

// get all integrations
const readAllIntegrations = async () => {
  try {
    const integrations = await Integration.find({}).sort({ _id: 1 });
    console.log(
      `New integrations Data is successfully returned ==: ${integrations}`
    );
    return integrations;
  } catch (err) {
    console.error(" == error:", err);
    return null;
  }
};

// get a specific integration
const readIntegrationById = async (id) => {
  try {
    const integration = await Integration.findById(id);
    console.log(
      `New integration Data is successfully returned ==: ${integration}`
    );
    return integration;
  } catch (err) {
    console.error(" == error:", err);
    return null;
  }
};

// find all integrations by signal
const readIntegrationsBySignal = async (signal) => {
  try {
    const integrations = await Integration.find({ signal: signal });
    console.log(
      `New integrations Data is successfully returned ==: ${integrations}`
    );
    return integrations;
  } catch (err) {
    console.error(" == error:", err);
    return null;
  }
};

// update a specific integration
const updateIntegration = async (body, id) => {
  try {
    const integration = await Integration.findById(id);
    if (!integration) {
      return false;
    }
    integration.set(body);
    await integration.save();
    console.log(
      `New integration Data is successfully updated ==: ${integration}`
    );
    return true;
  } catch (err) {
    console.error(" == error:", err);
    return false;
  }
};

// delete a specific integration
const deleteIntegration = async (id) => {
  try {
    await Integration.findByIdAndDelete(id);
    console.log(`New integration Data is successfully deleted ==`);
    return true;
  } catch (err) {
    console.error(" == error:", err);
    return false;
  }
};

module.exports = {
  integrationValidSchema,
  createIntegration,
  readAllIntegrations,
  readIntegrationById,
  readIntegrationsBySignal,
  updateIntegration,
  deleteIntegration
};