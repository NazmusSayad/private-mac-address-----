const macStatus = JSON.parse(localStorage.getItem("mac"));
// ------------------
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
function epd() {
  event.preventDefault();
}
document.addEventListener("copy", epd);
document.addEventListener("contextmenu", epd);
document.addEventListener("dragstart", epd);
document.addEventListener("selectstart", epd);
document.addEventListener("cut", epd);
document.addEventListener("touchstart", epd);
document.addEventListener("paste", epd);
document.addEventListener("keydown", epd);

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
  </section>
  <section class="mainItemCon" id="unItem">
    <p class="heading">Unknown</p>
    <section class="con"></section>
  </section>`;
  document.querySelector("body").prepend(elMain);
  const ownerItem = document.querySelector("#ownerItem > .con");
  const userItem = document.querySelector("#userItem > .con");
  const otherItem = document.querySelector("#otherItem > .con");
  const unItem = document.querySelector("#unItem > .con");
  function setAndRemoveAt(par) {
    par.style.color = "red";
    setTimeout(() => {
      par.removeAttribute("Style");
    }, 300);
    navigator.clipboard.writeText(par.textContent.trim());
  }
  fetch("/list.json")
    .then((res) => res.json())
    .then((data) => asdfghjkl(data));
  function asdfghjkl(data) {
    data.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    data.forEach((item) => {
      const elArticle = document.createElement("article");
      elArticle.innerHTML = `<div class="name"><span class="bull">${item.name}</span></div> <div class="mac">${item.mac}</div> <div class="p">${item.des}</div>`;
      elArticle.onclick = function () {
        const bull = event.target.classList.contains("bull");
        if (bull) {
          setAndRemoveAt(event.target);
        } else {
          setAndRemoveAt(this.querySelector(".mac"));
        }
      };
      if (item.name.slice(0, 1) === "!") {
        elArticle.querySelector(".name span").innerHTML = item.name.slice(1);
        unItem.append(elArticle);
        return;
      }
      switch (item.des) {
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
    });
  }
};
// ------------------
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
