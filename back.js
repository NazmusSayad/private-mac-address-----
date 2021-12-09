const newComp = (parent = "div", innerH = "", classs = "", iddd = "") => {
  if (typeof parent !== "string" || typeof innerH !== "string" || typeof iddd !== "string" || typeof classs !== "string") {
    console.error("Wrong Parameter!");
    return null;
  }
  const parentE = document.createElement(parent);
  if (classs !== "") {
    parentE.setAttribute("class", classs);
  }
  if (iddd !== "") {
    parentE.setAttribute("id", iddd);
  }
  parentE.innerHTML = innerH.trim();
  return parentE;
};
// ------------------
const verifyLog = (username, password) => {
  if (username.toLowerCase() == "nazmussayad" && password == "ami kida") {
    return true;
  } else {
    return false;
  }
};
// ------------------
const execList = () => {
  document.title = "MAC Addresses ";
  const elMain = document.createElement("main");
  elMain.setAttribute("id", `listPage`);
  elMain.innerHTML = `
  <section class="mainItemCon" id="ownerItem">
    <p class="heading">Omnitrix</p>
    <section class="con"></section>
  </section>
  <section class="mainItemCon" id="userItem">
    <p class="heading">Users</p>
    <section class="con"></section>
  </section>
  <section class="mainItemCon" id="otherItem">
    <p class="heading">Others</p>
    <section class="con"></section>
  </section>`;
  document.querySelector("body").prepend(elMain);
  const ownerItem = document.querySelector("#ownerItem > .con");
  const userItem = document.querySelector("#userItem > .con");
  const otherItem = document.querySelector("#otherItem > .con");
  function setAndRemoveAt(par) {
    par.style.color = "red";
    setTimeout(() => {
      par.removeAttribute("Style");
    }, 300);
    navigator.clipboard.writeText(par.textContent.trim());
  }
  fetch("https://github.com/NazmusSayad/private-mac-address/raw/main/list.json")
    .then((res) => res.json())
    .then((data) => asdfghjkl(data));
  function asdfghjkl(data) {
    data.forEach((item) => {
      const elArticle = document.createElement("article");
      elArticle.innerHTML = `<div class="name"><span class="bull">${item.name}</span></div> <div class="mac">${item.mac}</div> <div class="p">${item.d}</div>`;
      switch (item.d) {
        case "♔":
          ownerItem.append(elArticle);
          break;
        case "":
          otherItem.append(elArticle);
          break;
        case undefined:
          otherItem.append(elArticle);
          break;
        default:
          userItem.append(elArticle);
          break;
      }
      elArticle.onclick = function () {
        const bull = event.target.classList.contains("bull");
        if (bull) {
          setAndRemoveAt(event.target);
        } else {
          setAndRemoveAt(this.querySelector(".mac"));
        }
      };
    });
  }
};
const execLogin = () => {
  document.title = "Admin-Login";
  const elLogInPage = newComp(
    "main",
    `
  <div id="loginPanel">
  <form id="loginBody">
    <div>
      <label for="username"></label>
      <i class="fas icon fa-user"></i>
      <input autocomplete="off" type="text" id="username" name="username" placeholder="Username" required />
    </div>
    <div>
      <label for="pass"></label>
      <i class="fas icon fa-lock"></i>
      <input type="password" id="password" name="password" placeholder="Password" required />
    </div>
    <div>
      <button id="btn" type="submit">Sign in</button>
    </div>
  </form>
  </div>
  `,
    "",
    "logInPage"
  );
  document.querySelector("body").prepend(elLogInPage);
  const logInForm = document.getElementById("loginBody");
  logInForm.onsubmit = function () {
    event.preventDefault();
    if (verifyLog(this.username.value, this.password.value)) {
      document.querySelector("main").remove();
      localStorage.setItem("mac", JSON.stringify({ u: this.username.value, p: this.password.value }));
      execList();
      return;
    }
    this.username.focus();
    alert("Wrong information!");
    this.username.value = "";
    this.password.value = "";
  };
};
var macStatus = JSON.parse(localStorage.getItem("mac"));
