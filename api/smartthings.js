const { Router } = require("express");
const { userValidSchema, createUser, readUserById } = require("../models/user");
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
    return;
  }

  try {
    const id = await createUser(body);
    res.status(201).send({ _id: id });
  } catch (err) {
    console.log(err);
    next();
  }
});

router.get("/:userId/devices", async (req, res, next) => {
  const userId = req.params.userId;
  var user = null;

  try {
    user = await readUserById(userId);
  } catch (err) {
    res.status(404).send(`ERROR: ${err}`);
    return;
  }

  if (!user) {
    res.status(404).send({ ERROR: "Cannot find the user" });
    return;
  }
  const token = user.token;
  var devices = null;
  try {
    devices = await getDevices(token);
    res.status(200).send({ devices: devices });
  } catch (err) {
    next();
  }
});

module.exports = router;
