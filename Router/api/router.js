const express = require("express");
const router = express.Router();

const users = require("../../api/users");
const travels = require("../../api/travels");
const login = require("../../api/login");
const matches = require("../../api/matches");

router.post("/login", login.login);
router.post("/register", login.register);
router.use("/users", users.getAllUsers);
router.get("/travels/:des", travels.getAllTravels);
router.get("/getDestinations", travels.getDestination);
router.use("/matches", matches.getTouristInfofromCentralServer);
router.get("/getScore/:id", users.getScore)

//router.get("/users/:id", users.getUserbyId);
router.post("/travels", travels.register);

module.exports = router;
