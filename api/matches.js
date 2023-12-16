const express = require("express");
const router = express.Router();
const db = require("../lib/DB");
const dbQuery = require('../lib/DB-query');

let matches = {
    // 중앙 서버 DB에서 여행객 정보를 가져오는 함수
    getTouristInfofromCentralServer: async function(touristIdList) {
        try {
            // getAllTravel 쿼리를 예시로 사용 (실제에는 적합한 쿼리를 사용해야 함)
            const [tourists] = await db.execute(dbQuery.getAllTravel);
            // ID 목록에 맞는 여행객 정보만 필터링
            return tourists.filter(tourist => touristIdList.includes(tourist.userId));
        } catch (error) {
            console.error("Error fetching tourist info from central server:", error);
            throw error;
        }
    },

    // 클라이언트와 여행객을 매칭하는 주요 로직
    matchTourists: async function(client) {
        // 예시로 DHT에서 가져온 것처럼 가정한 여행객 ID 목록
        const touristIdList = [1, 2, 3, 4, 5]; // 실제 구현에서는 DHT에서 이 데이터를 가져와야 함
        let touristList = await this.getTouristInfofromCentralServer(touristIdList);

        // 이후의 처리 로직 (점수 계산 및 정렬)은 이전과 동일
        // ...

        return touristList;
    },

    // 클라이언트와 여행객 매칭을 위한 API 라우트 처리 함수
    handleMatchRequest: async function(req, res) {
        try {
            const client = req.body; // 클라이언트 정보는 요청 본문에서 가져옵니다
            const matchedTourists = await this.matchTourists(client);
            res.json(matchedTourists);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};


module.exports = matches;
