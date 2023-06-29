const { Router } = require("express");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const {
  integrationValidSchema,
  createIntegration,
  readAllIntegrations,
  readIntegrationById,
  readIntegrationsBySignal,
  updateIntegration,
  deleteIntegration,
} = require("../models/Integrations.js");
const { updateSmartThingsDeviceState } = require("../lib/smartthings.js");
const router = Router();

/*
Get all integration data
*/
router.get("/", async (req, res, next) => {
  try {
    const result = await readAllIntegrations();
    res.status(200).send(result);
  } catch (err) {
    next();
  }
});

/*
Get all integrations data by id
*/
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await readIntegrationById(id);
    if (!result) {
      res.status(404).send({ Error: `id(${id}) does not exist` });
      return;
    }
    res.status(200).send(result);
  } catch (err) {
    next();
  }
});

/*
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
Edit the integration data by id
*/
router.patch("/:id", async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({ Error: "You need to pass an id for query" });
    return;
  }

  if (Object.keys(req.body).length === 0) {
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
Delete the integration data by id
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

router.post("/execute/:token", async (req, res, next) => {
  const signal = req.body.signal;

  if (!signal) {
    res.status(400).send({
      Error: "You need to pass a signal to execute your preferred actions",
    });
    return;
  }

  const token = req.params.token;
  var devices = null;

  try {
    // ※※※ TO DO:
    // 1. readIntegrationBySignal function should be updated.
    // : This function should only return the array of devices by signal to use updateSmartThingsDeviceState function.

    // updateSmartThingsDeviceState(bearerToken, deviceId, state)
    // You can see the details of this function in lib/smartthings.js

    devices = readIntegrationsBySignal(signal);

    // If there is no device, then just return status 200
    if (devices.length === 0) {
      res.status(200).send({ Message: "No device is found" });
      return;
    }

    // 2. I think once readIntegrationBySignal function is updated,
    // then the only thing we need to do is call updateSmartThingsDeviceState function to update our devices' status
  } catch (err) {
    // Some error handlings...
  }
  // ※※※ This is from our notion page by Alex
  // 1. Looks up all user integrations that match given signal classification (e.g. singleClap)
  // 2. For each integration’s outputs (e.g. SmartThings light bulbs), turn it on/off
});

module.exports = router;
