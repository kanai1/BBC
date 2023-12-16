const express = require("express");
const router = express.Router();
const db = require("../lib/DB");
const dbQuery = require("../lib/DB-query");

let travel = {
  getAllTravels: async function (req, res, next) {
    const des = req.params.des
    try {
      const [rows] = await db.execute(dbQuery.getAllTravelByDes, [des]);
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

  getDestination: async function(req, res, next) {
    try {
      const [destinations] = await db.execute(dbQuery.getDestination, [req.jwt.id])
      res.send({destinations})
    } catch {
      return res.status(500).send(err);
    }
  }
};

module.exports = travel;
