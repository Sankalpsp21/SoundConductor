const { Router } = require("express");

const router = Router();

router.use("/integrations", require("./integrations"));
router.use("/smartthings", require("./smartthings"));

module.exports = router;
