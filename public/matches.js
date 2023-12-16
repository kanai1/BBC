// public/matches.js
document.getElementById("matchForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const destination = document.getElementById("destination").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;

    fetch("/api/match", {
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
      const resultsContainer = document.getElementById("matchResults");
      resultsContainer.innerHTML = "";

      if (matches.length === 0) {
        resultsContainer.innerHTML = "<p>매칭 결과가 없습니다.</p>";
        return;
      }

      matches.forEach(match => {
        const div = document.createElement("div");
        div.className = "match-entry"; // CSS 클래스를 추가하여 스타일을 적용할 수 있습니다.
        div.innerHTML = `여행 정보 ID: ${match.travelInfoId}, 사용자 ID: ${match.userId}, 목적지: ${match.destination}, 신뢰도 점수: ${match.trustScore}`;
        resultsContainer.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      alert(`매칭 요청 중 오류가 발생했습니다: ${error.message}\n오류 위치: ${error.stack}`);
    });
});
