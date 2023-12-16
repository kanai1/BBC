const db = require("../lib/DB")

let Matches = {

    // 중앙 서버 DB에서 여행객 정보 가져오기
    getTouristInfofromCentralServer: async function(req, res, next) {
        try {
            // 예시: 모든 여행객 정보를 조회
            const [tourists] = await db.execute(dbQuery.getAllTravel);
            req.tourists = tourists;
            next();
        } catch (error) {
            console.error("Error fetching tourist info from central server:", error);
            res.status(500).send("서버 오류가 발생했습니다.");
        }
    },

    // 여행객 매칭 및 점수 계산
    matchTourists: async function(req, res) {
        try {
            let touristList = req.tourists;

            // 점수 계산 로직
            touristList.forEach(tourist => {
                tourist.combinationScore = 0;
                if (tourist.gender === req.body.clientGender) {
                    tourist.combinationScore += 100;
                }
                const ageDifference = Math.abs(tourist.age - req.body.clientAge);
                if (ageDifference <= 2) {
                    tourist.combinationScore += 70;
                } else if (ageDifference <= 6) {
                    tourist.combinationScore += 40;
                } else if (ageDifference <= 9) {
                    tourist.combinationScore += 20;
                } else {
                    tourist.combinationScore -= 10;
                }
                if (tourist.recommendationScore) {
                    const recommendationScore = tourist.recommendationScore;
                    if (recommendationScore <= 20) {
                        tourist.combinationScore -= 10;
                    } else if (recommendationScore <= 50) {
                        tourist.combinationScore += 10;
                    } else if (recommendationScore <= 100) {
                        tourist.combinationScore += 20;
                    }
                }
            });

            touristList.sort((a, b) => b.combinationScore - a.combinationScore);

            res.json(touristList);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = Matches;
