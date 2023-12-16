const express = require("express");
const router = express.Router();

router.use("/chat", (req, res, next) => {
  if (req.jwt.name) res.render("chat.ejs", { name: req.jwt.name });
  else res.redirect("/page/login");
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

router.use("/matches", (req, res, next) => {
  res.render("matches.ejs");
});

router.use("/registerTravel", (req, res, next) => {
  if (req.jwt.name) res.render("registerTravel.ejs", { id: req.jwt.id });
  else res.redirect("/page/login");
});

module.exports = router;
