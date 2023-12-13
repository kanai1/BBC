const express = require("express");
const router = express.Router();

const users = require("../../api/users");
const travels = require("../../api/travels");

router.use("/users", users.getAllUsers);
router.use("/travels", travels.getAllTravels);

module.exports = router;
