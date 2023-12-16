// public/matches.js
document.addEventListener("DOMContentLoaded", function () {
    const matchForm = document.getElementById("matchForm");
    const resultsContainer = document.getElementById("matchResults");

    matchForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // 입력 필드에서 값을 가져옵니다.
        const destination = document.getElementById("destination").value;
        const age = document.getElementById("age").value;
        const gender = document.getElementById("gender").value;

        // 서버에 POST 요청을 보냅니다.
        fetch("/api/matches", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ destination, age, gender })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`서버 응답 오류: ${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .then(matches => {
            resultsContainer.innerHTML = "";

            if (matches.length === 0) {
                resultsContainer.innerHTML = "<p>매칭 결과가 없습니다.</p>";
                return;
            }

            // 서버로부터 받은 매칭 결과를 화면에 표시합니다.
            matches.forEach(match => {
                const div = document.createElement("div");
                div.className = "match-entry";
                div.innerHTML = `
                    여행 정보 ID: ${match.travelInfoId}, 
                    사용자 ID: ${match.userId}, 
                    목적지: ${match.destination}, 
                    신뢰도 점수: ${match.trustScore}`;
                resultsContainer.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`매칭 요청 중 오류가 발생했습니다: ${error.message}`);
        });
    });
});
