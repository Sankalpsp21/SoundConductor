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
  executeIntegrations,
} = require("../models/Integrations.js");
const router = Router();

/*
Get all integration data -- DONE ------------------------------------------------------------------------------------------------------------------------
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
Get a specific integration's data by its objectId --- DONE ------------------------------------------------------------------------------------------------------------------------
*/
router.get("/:id", async (req, res, next) => {
  const objectId = req.params.id;

  try {
    const result = await readIntegrationById(objectId);
    if (!result) {
      res.status(404).send({ Error: `objectId(${objectId}) does not exist` });
      return;
    }
    res.status(200).send(result);
  } catch (err) {
    next();
  }
});

/*
Experiencing error with objectId validation
Create a new integration data ------------------------------------------------------------------------------------------------------------------------
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
Execute an integration by signal
*/
router.post("integrations/execute", async (req, res, next) => {
  signal = req.body.signal;

  if (!signal) {
    res.status(400).send({ Error: "You need to pass an signal to execute" });
    return;
  }

  try{
    const result = await executeIntegration(signal);

    if(result) {
      res.status(200).send({});
      return;
    } else {
      res.status(404).send({ Error: `signal(${signal}) does not exist` });
      return;
    }

  }catch(err){
    next();
  }
});

/*
Edit a specific integration's data by id -- DONE ------------------------------------------------------------------------------------------------------------------------
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
Delete a specific integration by id -- DONE------------------------------------------------------------------------------------------------------------------------
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
router.post("/execute/:token", async (req, res, next) => {
  const signal = req.body.signal;
  const bearerToken = req.params.token;

  //TODO: Look up token based off the user ID which will be passed in.

  console.log("signal: " + signal)
  console.log("bearerToken: " + bearerToken)

  if (!signal) {
    res.status(400).send({
      Error: "You need to pass a signal to execute your preferred actions",
    });
    return;
  }

  if (!bearerToken) {
    res.status(400).send({
      Error: "You need to pass a bearer token to execute your preferred actions",
    });
    return;
  }

  var devices = null;

  try {

    devices = await readIntegrationsBySignal(signal);


    // If there is no device, then just return status 200
    if (devices.length === 0) {
      res.status(200).send({ Message: "No device is found" });
      return;
    }

    // If there is a device, then execute the integration

    const executionResult = await executeIntegrations(signal, bearerToken);


    if(executionResult){
      res.status(200).send({ Message: "Integration is successfully executed" });
      return;

    }else{
      res.status(400).send({ Error: "Integration is not successfully executed" });
      return;
    }

  } catch (err) {
    next();
  }
});

module.exports = router;
