const express = require("express");
const router = express.Router();

const users = require("../../api/users");
const travels = require("../../api/travels");
const login = require("../../api/login");
const match = require("../../api/matches"); 

router.post("/login", login.login);
router.post("/register", login.register);
router.use("/users", users.getAllUsers);
router.use("/travels", travels.getAllTravels);
router.use("/matches", match.matches);

module.exports = router;
