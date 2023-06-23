const { Router } = require("express");

const router = Router();

router.use("/audioactions", require("./audioactions"));

module.exports = router;
