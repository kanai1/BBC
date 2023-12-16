const express = require("express");
const router = express.Router();

router.use("/chat", (req, res, next) => {
  res.render("chat.ejs", {name: req.jwt.name});
});

router.use("/board", (req, res, next) => {
  res.render("board.ejs");
});

router.use("/login", (req, res, next) => {
  res.render("login.ejs");
});

router.use("/register", (req, res, next) => {
  res.render("register.ejs");
});

module.exports = router;
