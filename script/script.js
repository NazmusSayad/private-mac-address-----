const navigation = {
  warning: function (a = "") {
    this.append_new_item("warning")
  },

  login: function () {
    this.append_new_item("login")
  },

  main: function () {
    this.append_new_item("main")
  },

  append_new_item: function (name) {
    DOM.main.appendChild(HTML[name])
    setTimeout(() => {
      DOM.animated_image.className = name
      document.querySelector(`#${name}`).classList.add("active")
    }, 100)

    this.remove_old_item(name)
  },

  remove_old_item: function (except) {
    if (this.current && this.current !== except) {
      HTML[this.current].classList.remove("active")

      setTimeout(() => {
        HTML[this.current].remove()
        this.current = except
      }, 500)
    } else {
      this.current = except
    }
  },
}
const html = (innerH = "", iddd = "") => {
  const parentE = document.createElement("section")
  if (iddd !== "") parentE.setAttribute("id", iddd.trim())
  parentE.innerHTML = innerH.trim()
  parentE.setAttribute("main_content", "")
  return parentE
}
