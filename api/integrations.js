const { Router } = require("express");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const {
  integrationValidSchema,
  createIntegration,
  readAllIntegrationsByUserId,
  readIntegrationById,
  readIntegrationsBySignal,
  updateIntegration,
  deleteIntegration,
  executeIntegrations,
} = require("../models/Integrations.js");

const { readUserById } = require("../models/user.js");
const router = Router();

/*
Get all integration data
*/
router.get("/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const result = await readAllIntegrationsByUserId(userId);
    res.status(200).send(result);
  } catch (err) {
    next();
  }
});

/*
Experiencing error with objectId validation
Create a new integration data 
*/
router.post("/", async (req, res, next) => {
  var body = null;
  try {
    body = await integrationValidSchema.validateAsync(req.body);
  } catch (err) {
    res.status(400).send({ ERROR: "Invalid body" });
    return;
  }

  // Check if userId's type is ObjectId
  if (!ObjectId.isValid(req.body.userId)) {
    res.status(400).send({ ERROR: "Invalid body" });
    return;
  }

  try {
    const id = await createIntegration(body);
    res.status(201).send({ _id: id });
  } catch (err) {
    next();
  }
});

/*
Edit a specific integration's data by id
*/
router.patch("/:id", async (req, res, next) => {
  const id = req.params.id;

  delete req.body.integrationId;

  if (!id) {
    res.status(400).send({ Error: "You need to pass an id for query" });
    return;
  }

  if (!req.body) {
    res.status(400).send({ Error: "You need to pass a body for update" });
    return;
  }

  try {
    const result = await updateIntegration(req.body, id);

    if (result) {
      res.status(200).send({});
      return;
    } else {
      res.status(404).send({ Error: `id(${id}) does not exist` });
      return;
    }
  } catch (err) {
    next();
  }
});

/*
Delete a specific integration by id
*/
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({ Error: "You need to pass an id for query" });
    return;
  }

  try {
    const result = await deleteIntegration(id);

    if (result) {
      res.status(204).send({});
      return;
    } else {
      res.status(404).send({ Error: `id(${id}) does not exist` });
      return;
    }
  } catch (err) {
    next();
  }
});

//passing token but wants to use the userid to get the token

// 1. Looks up all user integrations that match given signal classification (e.g. singleClap)
// 2. For each integration’s outputs (e.g. SmartThings light bulbs), turn it on/off
router.post("/:userId/execute", async (req, res, next) => {
  const userId = req.params.userId;
  const signal = req.body.signal;
  var user = null;

  if (!signal) {
    res.status(400).send({
      Error: "You need to pass a signal to execute your preferred actions",
    });
    return;
  }

  // Find a user with a given userId and get the token
  try {
    user = await readUserById(userId);

    if (!user) {
      res.status(404).send({ Error: "Cannot find the user" });
      return;
    }
  } catch (err) {
    res.status(404).send({ Error: "Cannot find the user" });
    return;
  }

  const token = user.token;
  var devices = null;

  try {
    devices = await readIntegrationsBySignal(signal);

    // If there is no device, then just return status 200
    if (devices.length === 0) {
      res.status(200).send({ Message: "No device is found" });
      return;
    }

    // If there is a device, then execute the integration

    const executionResult = await executeIntegrations(signal, token);

    if (executionResult) {
      res.status(200).send({ Message: "Integration is successfully executed" });
      return;
    } else {
      res
        .status(400)
        .send({ Error: "Integration is not successfully executed" });
      return;
    }
  } catch (err) {
    next();
  }
});

module.exports = router;
