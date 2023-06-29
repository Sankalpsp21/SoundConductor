const { Router } = require("express");
const { userValidSchema, createUser } = require("../models/user");
const { getDevices } = require("../lib/smartthings");
const router = Router();

/*
Create a new integration data
*/
router.post("/token", async (req, res, next) => {
  var body = null;
  try {
    body = await userValidSchema.validateAsync(req.body);
  } catch (err) {
    res.status(400).send({ ERROR: "Invalid body" });
  }

  try {
    const id = await createUser(body);
    res.status(201).send({ _id: id });
  } catch (err) {
    next();
  }
});

router.get("/devices/:token", async (req, res, next) => {
  const token = req.params.token;
  var devices = null;
  try {
    devices = await getDevices(token);
    res.status(200).send({ devices: devices });
  } catch (err) {
    next();
  }
});

module.exports = router;
