const express = require("express");
const router = express.Router();
const db = require("../lib/DB");
const dbQuery = require('../lib/DB-query');

let Matches = {
    getTouristInfofromCentralServer: async function(req, res, next) {
        try {
            // 예시로 모든 여행 정보를 가져오는 쿼리를 사용 (실제에는 적합한 쿼리를 사용해야 함)
            const [tourists] = await db.execute(dbQuery.getAllTravel);
            
            // 이후 필요한 로직을 추가합니다. 예를 들어, req에서 필요한 데이터를 추출하고 필터링을 할 수 있습니다.
            // 예시: const filteredTourists = tourists.filter(...);

            // 필터링된 결과를 다음 미들웨어로 전달
            req.tourists = tourists; // 혹은 filteredTourists
            next();
        } catch (error) {
            console.error("Error fetching tourist info from central server:", error);
            res.status(500).send("서버 오류가 발생했습니다.");
        }
    },

    matchTourists: async function(req, res) {
        try {
            // getTouristInfofromCentralServer 미들웨어에서 설정된 tourists 사용
            const matchedTourists = req.tourists;

            // 필요한 추가 로직 (점수 계산, 정렬 등)
            // ...

            res.json(matchedTourists);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};


module.exports = Matches;
