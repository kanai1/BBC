const express = require("express");
const router = express.Router();
const db = require("../../db");

// 모든 사용자의 정보를 가져오는 엔드포인트
router.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

module.exports = router;
