const express = require("express");
const router = express.Router();
const APIrouter = require("./api/router");
const PAGErouter = require("./page/router");
const jwt = require("../api/jwt_utils")

router.use("/", jwt.verify);
router.use("/page", PAGErouter);
router.use("/api", APIrouter);

module.exports = router;
