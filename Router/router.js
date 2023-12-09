const express = require("express");
const router = express.Router();
const APIrouter = require("./api/router");
const PAGErouter = require("./page/router");
const usersRouter = require("./api/users");

router.use("/page", PAGErouter);
router.use("/api", APIrouter);
router.use("/api", usersRouter);

module.exports = router;
