// 데이터 요청 함수
async function fetchData() {
  const des = document.getElementById('destination').value
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
    const aCell = document.createElement("a")

    aCell.setAttribute("href", "/page/chat")

    idCell.textContent = item.travelInfoId;
    aCell.textContent = item.destination;
    arrivalTimeCell.textContent = item.arrivalTime;

    console.log(item);

    destinationCell.appendChild(aCell);

    row.appendChild(idCell);
    row.appendChild(destinationCell);
    row.appendChild(arrivalTimeCell);

    tableBody.appendChild(row);
  });
}

function removeAllChildren(element) {
  while (element.firstChild) {
    removeAllChildren(element.firstChild);
    element.removeChild(element.firstChild);
  }
}

const select = document.getElementById("destination")

select.addEventListener("change", async () => {
  const tableBody = document.getElementById("tableBody");
  removeAllChildren(tableBody)
  const data = await fetchData();
  if (data) {
    displayData(data);
  }
})

// 데이터 요청 후 표시 함수 호출
async function init() {
  const select = document.getElementById("destination")
  try {
    const response = await fetch('/api/getDestinations');
    const Desdata = await response.json()
    Desdata.destinations.forEach((i) => {
      const option = document.createElement("option")
      option.setAttribute("value", i.destination)
      option.textContent = i.destination
      select.appendChild(option)
    })
    const data = await fetchData();
    if (data) {
      displayData(data);
    }

  } catch(e) {
    console.log(e)
  }
}

init();