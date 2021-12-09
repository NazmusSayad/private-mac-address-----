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

if (!macStatus) {
  execLogin();
} else if (macStatus.u && macStatus.p && verifyLog(macStatus.u, macStatus.p)) {
  execList();
}
