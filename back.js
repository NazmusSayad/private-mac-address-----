const macStatus = JSON.parse(localStorage.getItem("mac"));
let contextArticle;
// ------------------
const newComp = (parent = "div", innerH = "", classs = "", iddd = "") => {
  if (typeof parent !== "string" || typeof innerH !== "string" || typeof iddd !== "string" || typeof classs !== "string") {
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
const hideContext = function () {
  document.querySelector("#context").style.display = "none";
};
// ------------------
function showHide(self) {
  if (self.classList.contains("fa-eye")) {
    self.classList.add("fa-eye-slash");
    self.classList.remove("fa-eye");
    self.parentNode.querySelector("#password").type = "password";
  } else {
    self.classList.add("fa-eye");
    self.classList.remove("fa-eye-slash");
    self.parentNode.querySelector("#password").type = "text";
  }
}
// ------------------
function epd() {
  event.preventDefault();
}
// ------------------
const search = (input) => {
  document.querySelectorAll(".mainItemCon article").forEach((element) => {
    const bullll = [];
    input.value.split(" ").forEach((find) => {
      bullll.push(element.tag.includes(find));
    });
    const bulset = Array.from(new Set(bullll));
    const bulbul = bulset.length === 1 && bulset[0] === true;
    if (bulbul) {
      element.removeAttribute("Style");
    } else {
      element.style.display = "none";
    }
  });
  const allElmsVisible = [];
  document.querySelectorAll(".mainItemCon").forEach((element) => {
    const trueFalse = [];
    element.querySelectorAll("article").forEach((element2) => {
      if (!element2.style.display) {
        trueFalse.push(true);
        allElmsVisible.push(true);
      }
    });
    if (!trueFalse.includes(true)) {
      element.style.display = "none";
    } else {
      element.removeAttribute("Style");
    }
  });
  if (allElmsVisible.length < 1) {
    document.getElementById("noResult").classList.add("noResult");
  } else {
    document.getElementById("noResult").classList.remove("noResult");
  }
};
// ------------------
const execList = () => {
  document.title = "MAC Addresses ";
  const elMain = document.createElement("main");
  elMain.setAttribute("id", `listPage`);
  elMain.innerHTML = `
<header>      
<section class="search">
  <i class="searchIcon ico" onclick="this.parentNode.querySelector('input').focus();"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg></i>
  <input oninput="search(this)" autocomplete="off" type="text">
  <i class="crossIcon ico" onclick="self = this.parentNode.querySelector('input');self.value='';self.focus();search(self)"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg></i>
</section>
<section id="logOut">
  <button onclick="logOut()">Log Out</button>
</section>
</header>
<div id="context">
  <div item="name" class="item"><i><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="copy" class="svg-inline--fa fa-copy fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path></svg></i> Name</div>
  <div class="div"></div>
  <div item="mac" class="item"><i><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="copy" class="svg-inline--fa fa-copy fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"></path></svg></i> Mac</div>
</div>
<section class="mainItemCon" id="ownerItem">
  <p class="heading">♔ Owner ♔</p>
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
</section>
<footer id="noResult">
  <h1>No result found ):</h1>
</footer>`;
  document.querySelector("body").append(elMain);
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
      item.name = item.name.replace(/\s+/g, "");
      item.mac = item.mac.replace(/\s+/g, "");
      if (item.date) {
        item.date = item.date.replace(/\s+/g, "");
      }
      if (item.tag) {
        item.tag = item.tag.replace(/\s+/g, "");
      }
      const elArticle = document.createElement("article");
      elArticle.innerHTML = `<div class="name"><span class="bull">${item.name}</span></div> <div class="mac">${item.mac}</div> <div class="p">${
        item.date || ""
      }</div>`;
      elArticle.tag = (item.name + " " + item.mac + " " + (item.date || "") + " " + (item.tag || "")).toLowerCase();
      elArticle.onclick = function () {
        const bull = event.target.classList.contains("bull");
        if (bull) {
          setAndRemoveAt(event.target);
        } else {
          setAndRemoveAt(this.querySelector(".mac"));
        }
      };
      const contextMenu = document.querySelector("#context");
      elArticle.oncontextmenu = function () {
        const t = event.clientY;
        const l = event.clientX;
        contextMenu.style.top = t - 1 + "px";
        contextMenu.style.left = l - 1 + "px";
        contextMenu.style.display = "block";
        contextArticle = this;
      };
      contextMenu.onclick = () => {
        const tar = event.target.getAttribute("item");
        switch (tar) {
          case "name":
            setAndRemoveAt(contextArticle.querySelector(".name"));
            break;
          case "mac":
            setAndRemoveAt(contextArticle.querySelector(".mac"));
            break;
        }
        hideContext();
      };
      document.addEventListener("click", hideContext);
      if (item.name.slice(0, 1) === "-") {
        elArticle.querySelector(".name span").innerHTML = item.name.slice(1);
        unItem.append(elArticle);
        elArticle.tag += "unknownfaltuajairakidacininaoporichitojaninaetc";
        return;
      }
      switch (item.date) {
        case "♔":
          ownerItem.append(elArticle);
          elArticle.tag += "ownersamimemyselfsayadnazmusbabuthis";
          break;
        case "":
          otherItem.append(elArticle);
          elArticle.tag += "othersbakiextramorepublicpeoplesobaietc";
          break;
        case undefined:
          otherItem.append(elArticle);
          elArticle.tag += "othersbakiextramorepublicpeoplesobaietc";
          break;
        default:
          userItem.append(elArticle);
          elArticle.tag += "usersbaboharkarisprotebeshionnoraverifiederror";
          break;
      }
    });
    document.querySelector(".crossIcon").click();
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
      <input oncopy="event.preventDefault()" oncut="event.preventDefault()" onpaste="event.preventDefault()" type="password" id="password" name="password" placeholder="Password" required />
      <i onclick="showHide(this)" class="eye fas fa-eye-slash"></i>
    </div>
    <div class="checkDiv">
      <input type="checkbox" id="check" checked="true" name="check">
      <span>Stay logged in</span>
    </div>
    <div>
      <button id="btn" type="submit">Sign in</button>
    </div>
  </form>
  </div>`,
    "",
    "logInPage"
  );
  document.querySelector("body").prepend(elLogInPage);
  const logInForm = document.getElementById("loginBody");
  logInForm.onsubmit = function () {
    event.preventDefault();
    if (verifyLog(this.username.value, this.password.value)) {
      document.querySelector("main").remove();
      if (this.check.checked) {
        localStorage.setItem("mac", JSON.stringify({ u: this.username.value, p: this.password.value }));
      }
      execList();
      return;
    }
    this.username.focus();
    alert("Wrong information!");
    this.username.value = "";
    this.password.value = "";
  };
};
// ------------------
function logOut() {
  document.removeEventListener("click", hideContext);
  document.title = "Logging Out...";
  localStorage.clear();
  document.querySelector("main").remove();
  setTimeout(() => {
    execLogin();
  }, 500);
}
