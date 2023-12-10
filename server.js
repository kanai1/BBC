const express = require("express");
const cors = require("cors");
const http = require("http")
const router = require("./Router/router");
const { createTurnServer } = require('./lib/turn-server');

const app = express();
const server = http.createServer(app);

const turnServer = createTurnServer();
turnServer.start(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(turnServer)

app.set("views", "./public");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));

app.use("/", router);

app.listen(8888, () => {
  console.log("Server is listening to 8888");
});

process.on('exit', () => {
  turnServer.stop();
});

process.on('SIGINT', () => {
  process.exit();
});