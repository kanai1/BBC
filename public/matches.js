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
    .then(res => res.json())
    .then(matches => {
      const resultsContainer = document.getElementById("matchResults");
      resultsContainer.innerHTML = "";

      if (matches.length === 0) {
        resultsContainer.innerHTML = "<p>매칭 결과가 없습니다.</p>";
        return;
      }

      matches.forEach(match => {
        const div = document.createElement("div");
        div.innerHTML = `여행 정보 ID: ${match.travelInfoId}, 사용자 ID: ${match.userId}, 목적지: ${match.destination}, 신뢰도 점수: ${match.trustScore}`;
        resultsContainer.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      alert('매칭 요청 중 오류가 발생했습니다.');
    });
});
