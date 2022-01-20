const macStatus = (() => {
  return verifyLog(nGetCookie("u"), nGetCookie("p"))
})()
// ------------------
let contextArticle
document.addEventListener("contextmenu", epd)
document.addEventListener("dragstart", epd)
// ------------------
macStatus ? execList() : execLogin()
// ------------------
