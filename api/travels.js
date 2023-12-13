const express = require("express");
const router = express.Router();
const db = require("../lib/DB");
const dbQuery = require("../lib/DB-query");

let travel = {
  getAllTravels: async function (req, res, next) {
    try {
      const [rows] = await db.execute(dbQuery.getAllTravel);
      res.send({ data: rows });
    } catch {
      return res.status(500).send(err);
    }
  },
};

module.exports = travel;
