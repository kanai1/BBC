const express = require("express");
const cors = require("cors");
const router = require("./Router/router");
const { createTurnServer } = require('./turn-server');

const app = express();

const turnServer = createTurnServer();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(turnServer.router)

app.set("views", "./public");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));

app.use("/", router);

const server = app.listen(8888, () => {
  console.log("Server is listening to 8888");
});

process.on('exit', () => {
  turnServer.stop();
});

process.on('SIGINT', () => {
  process.exit();
});