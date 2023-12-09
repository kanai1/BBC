const express = require("express");
const cors = require("cors");
const router = require("./Router/router");
const fs = require("fs");
const path = require("path");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./public");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));

app.use("/", router);

const server = app.listen(8888, () => {
  console.log("Server is listening to 8888");
});

// db 초기 데이터 구성
const initSql = fs.readFileSync(
  path.join(__dirname, "lib", "init.sql"),
  "utf-8"
);

db.query(initSql, (err, results) => {
  if (err) {
    console.error("Error executing init.sql: ", err);
    process.exit(1);
  }
  console.log("init.sql executed successfully");
});
