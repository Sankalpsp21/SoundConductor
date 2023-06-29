const { Router } = require("express");
const {
  integrationValidSchema,
  createIntegration,
  readAllIntegrations,
  readIntegrationById,
  readIntegrationsBySignal,
  updateIntegration,
  deleteIntegration
} = require("../models/Integrations.js");
const { validateSchema } = require("../lib/validation");
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
Get all integrations data by signal
*/
router.get("/:signal", async (req, res, next) => {
  const signal = req.params.signal;

  if (!signal) {
    res.status(400).send({ Error: "You need to pass a signal for query" });
    return;
  }

  try {
    const result = await readIntegrationsBySignal(signal);
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
      res.status(400).send({ Error: "Failed to update the data" });
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
      res.status(400).send({ Error: "Failed to delete the data" });
      return;
    }
  } catch (err) {
    next();
  }
});

module.exports = router;
