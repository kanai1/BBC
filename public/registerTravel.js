// register.js
const registerButton = document.getElementById("registerButton");
const inputDestination = document.getElementById("inputDestination");
const inputArrivalTime = document.getElementById("inputArrivalTime");
const inputUserId = document.getElementById("inputUserId");

const handleInputDestination = (e) => {
  inputDestination.value = e.target.value;
};

const handleInputArrivalTime = (e) => {
  inputArrivalTime.value = e.target.value;
};

const handleInputUserId = (e) => {
  inputUserId.value = e.target.value;
};

const onClickRegister = () => {
  const userData = {
    userId: inputUserId.value,
    destination: inputDestination.value,
    arrivalTime: inputArrivalTime.value,
  };
  console.log(userData);
  fetch("/api/travels", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.error) {
        alert(json.error);
      } else if (json.result === true) {
        alert("여행지 등록에 성공하였습니다.");
        window.location.href = "/page/board";
      }
    });
};

document
  .getElementById("inputDestination")
  .addEventListener("input", handleInputDestination);
document
  .getElementById("inputArrivalTime")
  .addEventListener("input", handleInputArrivalTime);
document
  .getElementById("inputUserId")
  .addEventListener("input", handleInputUserId);
document
  .getElementById("registerButton")
  .addEventListener("click", onClickRegister);
