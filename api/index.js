const { Router } = require("express");

const router = Router();

router.use("/integrations", require("./integrations"));
router.use("/smartthings", require("./smartthings"));
router.use("/users", require("./users"));

module.exports = router;
