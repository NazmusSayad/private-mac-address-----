document.querySelector(".animation_image").onclick = function () {
  this.style.opacity = 0
  this.ontransitionend = () => {
    this.removeAttribute("style")
    this.classList.toggle("active")
    this.ontransitionend = () => {}
  }
}
