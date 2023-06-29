const { Router } = require("express");

const router = Router();

router.use("/integrations", require("./integrations"));

module.exports = router;
