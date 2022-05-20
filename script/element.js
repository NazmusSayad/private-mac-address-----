const DOM = {
  animated_image: document.querySelector("#animation_image"),
  main: document.querySelector("main"),
}
const HTML = {
  warning: html(
    `<div class="---wrapper--- warning">
      <h1 class="warning__heading">Attention!!</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, eaque?</p>
      <button>Lorem, ipsum.</button>
    </div>`,
    "warning"
  ),
  login: html(
    `Log-in`,
    "login"
  ),
  main: html(
    `Main`,
    "main"
  ),
}
