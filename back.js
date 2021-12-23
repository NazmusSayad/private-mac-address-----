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
// ------------------
const search = function () {
  const elms = [
    ...document.querySelectorAll("#userItem article"),
    ...document.querySelectorAll("#otherItem article"),
    ...document.querySelectorAll("#unItem article"),
  ];
  elms.forEach((element) => {
    if (!element.textContent.toLowerCase().includes(input.value.toLowerCase())) {
      element.style.display = "none";
    } else {
      element.removeAttribute("Style");
    }
  });
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
<section class="search">
  <i class="searchIcon ico" onclick="this.parentNode.querySelector('input').focus()" ><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg></i>
  <input autocomplete="off" type="text">
  <i class="crossIcon ico" onclick="this.parentNode.querySelector('input').value='';this.parentNode.querySelector('input').focus();" ><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg></i>
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
