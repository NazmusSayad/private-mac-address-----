if (!macStatus) {
  execLogin();
} else if (macStatus.u && macStatus.p && verifyLog(macStatus.u, macStatus.p)) {
  execList();
}
// ------------------
