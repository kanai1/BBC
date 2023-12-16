// register.js
const registerButton = document.getElementById("registerButton");
const inputId = document.getElementById("inputId");
const inputPw = document.getElementById("inputPw");
const inputRpw = document.getElementById("inputRpw");
const inputName = document.getElementById("inputName");
const inputAge = document.getElementById("inputAge");
const inputGender = document.getElementById("inputGender");

const handleInputId = (e) => {
  inputId.value = e.target.value;
};

const handleInputPw = (e) => {
  inputPw.value = e.target.value;
};

const handleInputRpw = (e) => {
  inputRpw.value = e.target.value;
};

const handleInputName = (e) => {
  inputName.value = e.target.value;
};

const handleInputAge = (e) => {
  inputAge.value = e.target.value;
};

const handleInputGender = (e) => {
  inputGender.value = e.target.value;
};

const onClickRegister = () => {
  console.log("click Register");
  const userData = {
    id: inputId.value,
    password: inputPw.value,
    username: inputName.value,
    age: inputAge.value,
    gender: inputGender.value,
  };
  if (inputPw.value !== inputRpw.value) {
    alert("Check Retype Password");
    inputRpw.value = "";
  } else {
    fetch("/api/register", {
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
          alert("회원가입에 성공했습니다. 로그인해주세요.");
          window.location.href = "/page/login";
        }
      });
  }
};

document.getElementById("inputId").addEventListener("input", handleInputId);
document.getElementById("inputPw").addEventListener("input", handleInputPw);
document.getElementById("inputRpw").addEventListener("input", handleInputRpw);
document.getElementById("inputAge").addEventListener("input", handleInputAge);
document
  .getElementById("inputGender")
  .addEventListener("input", handleInputGender);
document
  .getElementById("registerButton")
  .addEventListener("click", onClickRegister);
