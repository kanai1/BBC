const express = require("express");
const cors = require("cors");
const router = require("./Router/router");
const dotenv = require("dotenv").config(); // 환경 변수를 불러오기 위해 dotenv를 사용
const mysql = require("mysql2"); // mysql2 모듈을 불러옴

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./public");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`));

app.use("/", router);

// 데이터베이스 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((error) => {
  if (error) throw error;
  console.log("Database connected successfully");
});

const server = app.listen(8888, () => {
  console.log("Server is listening to 8888");
});
