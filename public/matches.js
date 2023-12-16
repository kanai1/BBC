// public/matches.js
document.getElementById("matchForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // 'destination' 필드의 값을 가져옵니다.
    const destination = document.getElementById("destination").value;

    // 서버에 매칭 요청을 보내기 위한 fetch 호출
    fetch("/api/match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ destination }) // 'arrivalTime'은 제외
    })
    .then(res => res.json())
    .then(matches => {
      const resultsContainer = document.getElementById("matchResults");
      resultsContainer.innerHTML = ""; // 이전 결과 지우기

      if (matches.length === 0) {
        resultsContainer.innerHTML = "<p>매칭 결과가 없습니다.</p>";
        return;
      }

      matches.forEach(match => {
        const div = document.createElement("div");
        div.innerHTML = `여행 정보 ID: ${match.travelInfoId}, 사용자 ID: ${match.userId}, 목적지: ${match.destination}`;
        resultsContainer.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error:', error);
      alert('매칭 요청 중 오류가 발생했습니다.');
    });
});
