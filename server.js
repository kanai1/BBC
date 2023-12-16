const express = require("express");
const cors = require("cors");
const CookieParser = require('cookie-parser')
const router = require("./Router/router");
const websocket = require("./lib/websocket")

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CookieParser())

app.set("views", "./public");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));

app.use("/", router);

const server = app.listen(8888, () => {
  console.log("Server is listening to 8888");
});

websocket(server)