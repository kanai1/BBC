const express = require("express");
const router = express.Router();

router.use("/chat", (req, res, next) => {
  res.render("chat.ejs");
});

router.use("/board", (req, res, next) => {
  res.render("board.ejs");
});

router.use("/login", (req, res, next) => {
  res.render("login.ejs");
});

module.exports = router;
