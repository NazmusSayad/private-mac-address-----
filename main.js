document.addEventListener("contextmenu", epd);
document.addEventListener("dragstart", epd);
document.addEventListener("selectstart", epd);
// ------------------
if (!macStatus) {
  execLogin();
} else if (macStatus.u && macStatus.p && verifyLog(macStatus.u, macStatus.p)) {
  execList();
}
// ------------------
