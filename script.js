const name = "nazmussayad";
const pass = "ami kida";
var verifyName = "0";
var verifyPass = "0";
const inputAreas = document.querySelectorAll("input");
const nameInput = document.getElementById("username");
const passInput = document.getElementById("password");
// ---
inputAreas.forEach((inputArea) => {
  inputArea.addEventListener("input", function (e) {
    if (inputArea === nameInput) {
      if (inputArea.value.toLowerCase() === name) {
        verifyName = "1";
      } else {
        verifyName = "0";
      }
    }
    // ---
    if (inputArea === passInput) {
      if (inputArea.value === pass) {
        verifyPass = "1";
      } else {
        verifyPass = "0";
      }
    }
    // ---
    logInVerify();
  });
});
// ===
function clickSignInButton() {
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  if (password != "" && username != "") {
    wrongPassword();
  }
}
inputAreas.forEach(function (i) {
  i.addEventListener("keypress", function (keypress) {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    //
    if (keypress.keyCode === 13 && password != pass && password != "" && username != "") {
      wrongPassword();
      console.log("Login  Failed");
    } else if (keypress.keyCode === 13 && username != name && username != "" && password != "") {
      wrongPassword();
      console.log("Login  Failed");
    }
  });
});
// ---
function logInVerify() {
  if (verifyName === "1" && verifyPass === "1") {
    document.querySelector("body").outerHTML = " <embed src='list.html' /> ";
    document.querySelector("title").innerHTML = "MAC Address List";
  }
}
function wrongPassword() {
  document.querySelector("body").outerHTML = " <embed src='https://leancoding.co/PF23AD.php' /> ";
  document.querySelector("title").innerHTML = "Onnoware";
  document.querySelector("#favicon").outerHTML = "<link id='favicon' rel='shortcut icon' href='media/icon2.png'  />";
}
// Script END