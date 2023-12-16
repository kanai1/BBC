const express = require("express");
const router = express.Router();
const db = require("../lib/DB");
const dbQuery = require('../lib/DB-query');

// DHT에서 데이터를 가져오는 함수를 가정하여 구현 (실제 구현 필요)
const getTouristListfromDHT = async (destination, arriveDate) => {
    // 여기에 DHT에서 데이터를 가져오는 실제 로직을 구현해야 합니다.
    // 예시 코드는 반환 값이 샘플 데이터인 것으로 가정합니다.
    return [
        { id: 1, gender: "male", age: 30, recommendationScore: 50 },
        { id: 2, gender: "female", age: 25, recommendationScore: 70 },
        // ... 더 많은 샘플 데이터
    ];
};

// 중앙 서버 DB에서 여행객 정보를 가져오는 함수
const getTouristInfofromCentralServer = async (touristIdList) => {
    // 이 함수는 중앙 서버 DB에서 여행객의 상세 정보를 가져옵니다.
    // 예시 코드는 샘플 데이터를 반환합니다.
    return touristIdList.map(id => ({
        id,
        gender: id % 2 === 0 ? "female" : "male", // 단순 예시
        age: 20 + id, // 단순 예시
        recommendationScore: id * 10 // 단순 예시
    }));
};

// 클라이언트와 여행객을 매칭하는 주요 로직
const matchTourists = async (client) => {
    const touristListFromDHT = await getTouristListfromDHT(client.destination, client.arriveDate);
    let touristIdList = touristListFromDHT.map(tourist => tourist.id);
    let touristList = await getTouristInfofromCentralServer(touristIdList);

    // 여행객 리스트 점수 계산 및 정렬
    touristList.forEach(tourist => {
        tourist.combinationScore = 0;

        // 성별 점수 계산
        if (tourist.gender === client.gender) {
            tourist.combinationScore += 100;
        }

        // 나이 차이 점수 계산
        let ageDifference = Math.abs(tourist.age - client.age);
        if (ageDifference <= 2) {
            tourist.combinationScore += 70;
        } else if (ageDifference <= 6) {
            tourist.combinationScore += 40;
        } else if (ageDifference <= 9) {
            tourist.combinationScore += 20;
        } else {
            tourist.combinationScore -= 10;
        }

        // 추천 점수 계산
        let recommendationScore = tourist.recommendationScore;
        if (recommendationScore <= 20) {
            tourist.combinationScore -= 10;
        } else if (recommendationScore <= 50) {
            tourist.combinationScore += 10;
        } else if (recommendationScore <= 100) {
            tourist.combinationScore += 20;
        }
    });

    // 점수에 따라 내림차순으로 정렬
    touristList.sort((a, b) => b.combinationScore - a.combinationScore);

    return touristList;
};

// 클라이언트와 여행객 매칭을 위한 API 라우트
router.post('/match', async (req, res) => {
    try {
        const client = req.body; // 클라이언트 정보는 요청 본문에서 가져옵니다
        const matchedTourists = await matchTourists(client);
        res.json(matchedTourists);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
