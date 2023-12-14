// 데이터 요청 함수
async function fetchData() {
  try {
    const response = await fetch("/api/travels");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
    return null;
  }
}

// 데이터 표시 함수
function displayData(data) {
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";

  data.data.forEach((item) => {
    const row = document.createElement("tr");
    const idCell = document.createElement("td");
    const destinationCell = document.createElement("td");
    const arrivalTimeCell = document.createElement("td");

    idCell.textContent = item.travelInfoId;
    destinationCell.textContent = item.destination;
    arrivalTimeCell.textContent = item.arrivalTime;

    console.log(item);

    row.appendChild(idCell);
    row.appendChild(destinationCell);
    row.appendChild(arrivalTimeCell);

    tableBody.appendChild(row);
  });
}

// 데이터 요청 후 표시 함수 호출
async function init() {
  const data = await fetchData();
  if (data) {
    displayData(data);
  }
}

init();
