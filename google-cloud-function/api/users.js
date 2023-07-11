const { Router } = require("express");
const { readUserById } = require("../models/user");
const router = Router();

/*
Fetch a user data by id
*/
router.get("/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  var user = null;
  try {
    user = await readUserById(userId);
  } catch (err) {
    res.status(404).send({ ERROR: "Cannot found user" });
    return;
  }

  if (!user) {
    res.status(404).send({ ERROR: "Cannot found user" });
    return;
  }

  res.status(200).send(user);
  return;
});

module.exports = router;
