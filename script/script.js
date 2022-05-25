const navigation = {
  warning: async function (a = "") {
    this.old = document.querySelector("[main_content]") // Find the current window element
    const name = "warning"
    if (this.check_if_current_is_old(name)) return
    // Body

    const element = page_HTML_creator(
      `<div class="___wrapper___ warning">
    <h1 class="warning__heading">Attention!!</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, eaque?</p>
    <button onclick="navigation.login()" >Lorem, ipsum.</button>
  </div>`,
      name
    )
    // End

    DOM.main.appendChild(element)
    this.append_new_item(name) // what to do now
  },

  login: async function () {
    this.old = document.querySelector("[main_content]")
    const name = "login"
    if (this.check_if_current_is_old(name)) return
    // Body

    const data = await (await fetch("https://json.geoiplookup.io")).json()

    const element = page_HTML_creator(
      `<div class="___wrapper___ login">
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

      const username = event.target.elements["Username"].value.toLowerCase()
      const password = event.target.elements["Password"].value

      localStorage.setItem("u", username)
      localStorage.setItem("p", password)

      this.main(username, password)
    }

    // End
    DOM.main.appendChild(element)
    this.append_new_item(name)
  },

  main: async function (username, password) {
    if (username !== "nazmussayad" && password !== "idk") return
    this.old = document.querySelector("[main_content]")
    const name = "main"
    if (this.check_if_current_is_old(name)) return
    // Body
    const data = await ODB.jsonFile("../data/data.odb")

    const section_elements = {
      sayad: "",
      user: "",
      public: "",
      extra: "",
    }

    data.forEach((current) => {
      const className = "main__content-list--item"
      const tag = `${current.name} ${current.mac} ${current.tag} ${current.description} @${current.role || ""}`.toLowerCase()
      const innerHTML = `<div onclick="copy_this(this)" class="name">${current.name}</div><div onclick="copy_this(this)" class="mac">${current.mac}</div>`
      const title = current.description

      const full = `
      <div class="${className}" tag="${tag}" title="${title}" >
      ${innerHTML}
      </div>`

      switch (current.role) {
        case "sayad":
          section_elements.sayad += full
          break
        case "user":
          section_elements.user += full
          break
        case "public":
          section_elements.public += full
          break
        default:
          section_elements.extra += full
          break
      }
    })

    const element = page_HTML_creator(
      `
    <div id="search">
      <div class="___wrapper___">
        <input oninput="search()" type="text" placeholder="Search here..." class="search__input" name="search__input" id="" />
      </div>
    </div>
    <div class="___wrapper___ main">    
      <section class="main__content-list sayad">${section_elements.sayad}</section>
      <section class="main__content-list user">${section_elements.user}</section>
      <section class="main__content-list public">${section_elements.public}</section>
      <section class="main__content-list extra">${section_elements.extra}</section>
    </div>`,
      name
    )

    // End
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

const page_HTML_creator = (innerH = "", iddd = "") => {
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

const search = (input = event.target) => {
  clearTimeout(config.searchTimeout)
  config.searchTimeout = setTimeout(() => {
    // Start
    const raw_value = input.value.toLowerCase()
    const elements = document.querySelectorAll(".main__content-list--item")

    elements.forEach((current, index, array) => {
      const tag = current.getAttribute("tag")
      if (tag.includes(raw_value)) {
        current.removeAttribute("style")
      } else {
        current.style.display = "none"
      }
    })

    console.log(elements)
    // End
  }, 300)
}
const html = (t = "div", e = "", n = "", o = "") => {
  const r = document.createElement(t.trim())
  return "" !== n && r.setAttribute("class", n.trim()), "" !== o && r.setAttribute("id", o.trim()), (r.innerHTML = e.trim()), r
}

const copy_this = (self) => {
  self.style.color = "#90EE90"
  navigator.clipboard.writeText(self.textContent)

  setTimeout(() => {
    self.removeAttribute("style")
  }, 300)
}

window.addEventListener("contextmenu", () => event.preventDefault())

const array = []
const arrays = {}

;("/data/")
