// login.js
const loginButton = document.getElementById("loginButton");
const inputId = document.getElementById("inputId");
const inputPw = document.getElementById("inputPw");

const handleInputId = (e) => {
  inputId.value = e.target.value;
};

const handleInputPw = (e) => {
  inputPw.value = e.target.value;
};

const onClickLogin = () => {
  console.log("click login");
  const userData = {
    id: inputId.value,
    password: inputPw.value,
  };
  fetch("/api/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then((json) => {
      if (json.isLogin === true) {
        document.cookie = `token=${json.token}`
        window.location.href = "/board";
      } else {
        alert("로그인 실패");
      }
    });
};

const onClickRegister = () => {
  window.location.href = "/page/register";
};

document.getElementById("inputId").addEventListener("input", handleInputId);
document.getElementById("inputPw").addEventListener("input", handleInputPw);
document.getElementById("loginButton").addEventListener("click", onClickLogin);
document
  .getElementById("registerButton")
  .addEventListener("click", onClickRegister);