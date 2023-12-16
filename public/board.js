// 데이터 요청 함수
async function fetchData() {
  const des = docuemnt.getElementById('destination').value

  try {
    const response = await fetch(`/api/travels/${des}`);
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

async function getTravelInfo() {

}

// 데이터 요청 후 표시 함수 호출
async function init() {
  const select = document.getElementById("destination")
  try {
    const response = await fetch('/api/getDestinations');
    const data = await response.json()
    console.log(data)
    data.destinations.forEach((i) => {
      const option = document.createElement("option")
      option.setAttribute("value", i.destination)
      option.textContent = i.destination
      select.appendChild(option)
    })
  } catch(e) {
    console.log(e)
  }
}

init();
