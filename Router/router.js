const express = require("express");
const router = express.Router();
const APIrouter = require("./api/router");
const PAGErouter = require("./page/router");

router.use("/page", PAGErouter);
router.use("/api", APIrouter);

module.exports = router;
