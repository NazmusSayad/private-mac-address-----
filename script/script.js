const navigation = {
  warning: async function (a = "") {
    this.old = document.querySelector("[main_content]") // Find the current window element
    const name = "warning"
    if (this.check_if_current_is_old(name)) return

    const element = page_HTML_creator(
      `<div class="___wrapper___ warning">
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

    const data = await (await fetch("https://json.geoiplookup.io")).json() // Get data from IP address

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
      // Login submit
      event.preventDefault()

      const username = event.target.elements["Username"].value.toLowerCase() // You should know why??
      const password = event.target.elements["Password"].value

      // Saving Data for next time
      localStorage.setItem("u", username)
      localStorage.setItem("p", password)

      // Sending data to render list
      this.main(username, password)
    }

    DOM.main.appendChild(element)
    this.append_new_item(name)
  },

  main: async function (username, password) {
    if (username !== "nazmussayad" || password !== "idk") return // If wrong username and password
    this.old = document.querySelector("[main_content]")
    const name = "main"
    if (this.check_if_current_is_old(name)) return

    const data = await ODB.jsonFile("../data/data.odb")

    // Page Markup
    const element = page_HTML_creator(
      `
    <div id="search">
      <div class="___wrapper___">
        <input oninput="search()" type="text" placeholder="Search here..." class="search__input" name="search__input" id="" />
      </div>
    </div>
    <div class="___wrapper___ main">    
      <section js="section_elements_sayad" class="main__content-list sayad"></section>
      <section js="section_elements_user" class="main__content-list user"></section>
      <section js="section_elements_public" class="main__content-list public"></section>
      <section js="section_elements_extra" class="main__content-list extra"></section>
    </div>`,
      name
    )

    // Different Role Section
    const section_elements = {
      sayad: element.querySelector(`[js="section_elements_sayad"]`),
      user: element.querySelector(`[js="section_elements_user"]`),
      public: element.querySelector(`[js="section_elements_public"]`),
      extra: element.querySelector(`[js="section_elements_extra"]`),
    }

    data.forEach(({ name, mac, description, role, tag }) => {
      // Make The Hover Title
      let title = `Name: ${name}\nMac: ${mac}\n`
      if (description != null) {
        title += `Description: ${description}\n`
      }
      if (role != null) {
        title += `Role: ${role.charAt(0).toUpperCase() + role.slice(1)}\n`
      }
      if (tag != null) {
        title += `Tag: ${tag}\n`
      }

      // Make The Element
      const current_element = document.createElement(`div`)
      current_element.className = "main__content-list--item"
      current_element.title = title
      current_element.innerHTML = `<div onclick="copy_this(this)" class="name">${name}</div><div onclick="copy_this(this)" class="mac">${mac}</div>`

      if (role == null) {
        section_elements.extra.appendChild(current_element)
      } else {
        section_elements[role].appendChild(current_element)
      }
    })

    DOM.main.appendChild(element)
    this.append_new_item(name)
  },

  append_new_item: function (name) {
    setTimeout(() => {
      DOM.animated_image.className = name
      document.querySelector(`#${name}`).classList.add("active") // Adding active class for transition
    }, 100)

    if (this.old) {
      this.old.classList.remove("active") // Removing active also for transition

      setTimeout(() => {
        // after transition finished remove old element
        this.old.remove()
      }, 500)
    }
  },

  check_if_current_is_old: function (name) {
    // If current page is already in position
    return this.old && this.old.getAttribute("id") === name
  },
}

const page_HTML_creator = (innerH = "", iddd = "") => {
  // Creates main Page for this document
  const parentE = document.createElement("section")
  if (iddd !== "") parentE.setAttribute("id", iddd.trim())
  parentE.innerHTML = innerH.trim()
  parentE.setAttribute("main_content", "")
  return parentE
}

const pimple = function (self) {
  // Ripple click effect
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
  // Main page search
  clearTimeout(config.searchTimeout)
  config.searchTimeout = setTimeout(() => {
    const raw_value = input.value.toLowerCase()
    const elements = document.querySelectorAll(".main__content-list--item")

    elements.forEach((current) => {
      const isMatching = current.title.toLowerCase().includes(raw_value)

      if (isMatching) current.removeAttribute("style")
      else current.style.display = "none"
    })
  }, 300)
}

const html = (t = "div", e = "", n = "", o = "") => {
  const r = document.createElement(t.trim())
  return "" !== n && r.setAttribute("class", n.trim()), "" !== o && r.setAttribute("id", o.trim()), (r.innerHTML = e.trim()), r
}

const copy_this = (self) => {
  self.style.color = "#90EE90"
  navigator.clipboard.writeText(self.textContent.replace(/ /gim, ""))

  setTimeout(() => {
    self.removeAttribute("style")
  }, 300)
}

window.addEventListener("contextmenu", () => event.preventDefault())
