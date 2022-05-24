const navigation = {
  warning: async function (a = "") {
    this.old = document.querySelector("[main_content]") // Find the current window element
    const name = "warning"
    if (this.check_if_current_is_old(name)) return

    const element = html(
      `<div class="---wrapper--- warning">
    <h1 class="warning__heading">Attention!!</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, eaque?</p>
    <button onclick="navigation.login()" >Lorem, ipsum.</button>
  </div>`,
      name
    )
    DOM.main.appendChild(element)
    this.append_new_item(name) // what to do now
  },

  login: async function () {
    this.old = document.querySelector("[main_content]")
    const name = "login"
    if (this.check_if_current_is_old(name)) return

    const data = await (await fetch("https://json.geoiplookup.io")).json()

    const element = html(
      `<div class="---wrapper--- login">
    <form class="login__form">
      <div class="login__form--usernameBox">
        <input required placeholder="Username" type="text" name="Username" />
      </div>

      <div class="login__form--passwordBox">
        <input required placeholder="Password" type="password" name="Password" />
      </div>

      <div class="login__form--loginBox">
        <button onclick="pimple(this)" type="submit">
          <span>Login</span>
        </button>
      </div>
    </form>

    <article class="login__details">
      <p class="login__details--heading">${data.ip}</p>

      <table>
        <tbody>
          <tr class="login__details--item">
            <td class="name">City</td>
            <td class="clone">:</td>
            <td class="data">${data.city}</td>
          </tr>
          <tr class="login__details--item">
            <td class="name">region</td>
            <td class="clone">:</td>
            <td class="data">${data.region}</td>
          </tr>
          <tr class="login__details--item">
            <td class="name">country_name</td>
            <td class="clone">:</td>
            <td class="data">${data.country_name}</td>
          </tr>
          <tr class="login__details--item">
            <td class="name">asn_org</td>
            <td class="clone">:</td>
            <td class="data">${data.asn_org}</td>
          </tr>
        </tbody>
      </table>
    </article>
  </div>`,
      name
    )

    element.querySelector("form").onsubmit = () => {
      event.preventDefault()

      const username = event.target.elements["Username"].value
      const password = event.target.elements["Password"].value

      if (username.toLowerCase() === "nazmussayad" && password === "idk") {
        this.main()
      }
    }

    DOM.main.appendChild(element)
    this.append_new_item(name)
  },

  main: async function () {
    this.old = document.querySelector("[main_content]")
    const name = "main"
    if (this.check_if_current_is_old(name)) return

    const element = html(`Main`, name)
    DOM.main.appendChild(element)
    this.append_new_item(name)
  },

  append_new_item: function (name) {
    setTimeout(() => {
      DOM.animated_image.className = name
      document.querySelector(`#${name}`).classList.add("active")
    }, 100)

    if (this.old) {
      this.old.classList.remove("active")

      setTimeout(() => {
        this.old.remove()
      }, 500)
    }
  },

  check_if_current_is_old: function (name) {
    return this.old && this.old.getAttribute("id") === name
  },
}
const html = (innerH = "", iddd = "") => {
  const parentE = document.createElement("section")
  if (iddd !== "") parentE.setAttribute("id", iddd.trim())
  parentE.innerHTML = innerH.trim()
  parentE.setAttribute("main_content", "")
  return parentE
}

const pimple = function (self) {
  const circle = document.createElement("div")
  const x = event.layerX
  const y = event.layerY

  circle.classList.add("spare")

  circle.style.left = `${x}px`
  circle.style.top = `${y}px`

  self.appendChild(circle)
  circle.onanimationend = () => {
    circle.remove()
  }
}
