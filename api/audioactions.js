const { Router } = require("express");
const {
  audioActionValidSchema,
  createAudioAction,
  readAudioAction,
  readAudioActions,
  readAudioActionsBySignal,
  updateAudioAction,
  deleteAudioAction,
} = require("../models/audioAction");
const { validateSchema } = require("../lib/validation");
const router = Router();

/*
Get all audioactions data
*/
router.get("/", async (req, res, next) => {
  try {
    const result = await readAudioActions();
    res.status(200).send(result);
  } catch (err) {
    next();
  }
});

/*
Get all audioactions data by signal
*/
router.get("/:signal", async (req, res, next) => {
  const signal = req.params.signal;

  if (!signal) {
    res.status(400).send({ Error: "You need to pass a signal for query" });
    return;
  }

  try {
    const result = await readAudioActionsBySignal(signal);
    res.status(200).send(result);
  } catch (err) {
    next();
  }
});

/*
Create a new audioaction data
*/
router.post("/", async (req, res, next) => {
  var body = null;
  try {
    body = await audioActionValidSchema.validateAsync(req.body);
  } catch (err) {
    res.status(400).send({ ERROR: "Invalid body" });
  }

  try {
    const id = await createAudioAction(body);
    res.status(201).send({ _id: id });
  } catch (err) {
    next();
  }
});

/*
Edit the audioaction data by id
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
    const result = await updateAudioAction(req.body, id);

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
Delete the audioaction data by id
*/
router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({ Error: "You need to pass an id for query" });
    return;
  }

  try {
    const result = await deleteAudioAction(id);

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
