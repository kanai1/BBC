const db = require("../lib/DB");
const dbQuery = require("../lib/DB-query");

let user = {
  getAllUsers: async function (req, res, next) {
    try {
      const [rows] = await db.execute(dbQuery.getAllUser);
      res.send({ data: rows });
    } catch(err) {
      return res.status(500).send(err);
    }
  },

  getScore: async function (req, res, next) {
    try{
      const [rows] = await db.execute(dbQuery.getScoreById, [req.params.id])
      res.send({data: rows[0].trustScore})
    } catch(e) {
      return res.status(500).send(e)
    }
  }

  // getUserbyId: async function (req, res, next) {
  //   const loginId = req.params.loginId;

  //   try {
  //     const [rows] = await db.execute(dbQuery.getUserbyId, [loginId]);
  //     res.send({ data: rows });
  //   } catch {
  //     return res.status(500).send(err);
  //   }
  // },
};

module.exports = user;
