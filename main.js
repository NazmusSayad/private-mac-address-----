document.addEventListener("copy", epd);
document.addEventListener("contextmenu", epd);
document.addEventListener("dragstart", epd);
document.addEventListener("selectstart", epd);
document.addEventListener("cut", epd);
document.addEventListener("touchstart", epd);
document.addEventListener("paste", epd);
// ------------------
if (!macStatus) {
  execLogin();
} else if (macStatus.u && macStatus.p && verifyLog(macStatus.u, macStatus.p)) {
  execList();
}
// ------------------
const input = document.querySelector(".search input");
input.addEventListener("input", search);
document.querySelectorAll(".search i").forEach((e) => {
  e.addEventListener("click", search);
});
