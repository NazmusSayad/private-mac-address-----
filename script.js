const nameInput = document.getElementById("username")
const passInput = document.getElementById("password")
const form = document.getElementById("loginBody")
form.addEventListener("submit", () => {
  if (nameInput.value.toLowerCase() === "nazmussayad" && passInput.value.toLowerCase() === "ami kida") {
    document.querySelector("body").outerHTML = " <embed src='list.html' /> "
    document.querySelector("title").innerHTML = "MAC Address List"
  } else {
    document.querySelector("body").outerHTML = " <embed src='https://leancoding.co/PF23AD.php' /> "
    document.querySelector("title").innerHTML = "Onnoware"
    document.querySelector("#favicon").outerHTML = "<link id='favicon' rel='shortcut icon' href='media/icon2.png'  />"
  }
})
