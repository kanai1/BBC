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

  register: async function (req, res) {
    const userId = req.body.userId;
    const destination = req.body.destination;
    const arrivalTime = req.body.arrivalTime;

    try {
      await db.execute(dbQuery.registerTravel, [
        userId,
        destination,
        arrivalTime,
      ]);
      res.send({ result: true });
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};

module.exports = travel;
