const render = Object.seal({
   copy() {
      const element = event.target
      const text = element.textContent.replace(/ /gm, "")

      navigator.clipboard.writeText(text)

      element.classList.add(`copied`)
      setTimeout(() => element.classList.remove(`copied`), 400)
   },

   clearBody() {
      document.qs("body").innerHTML = ""
   },

   getListBoxs(container = document.qs(`[js="listContainer"]`)) {
      return {
         sayad: container.querySelector(`.list__box.sayad`),
         user: container.querySelector(`.list__box.user`),
         public: container.querySelector(`.list__box.public`),
      }
   },

   appendItem(data, listbox = this.getListBoxs()) {
      let newData = ""
      for (let key in data) {
         if (data[key]) {
            newData += "\n" + data[key]
         }
      }
      newData = newData.toLowerCase()

      const templateItems = HTML(`
      <section js="list-item" class="list__box--item" data-id="${data._id}" ondblclick="User.show(this)" oncontextmenu="User.show(this)">
      <div  onclick="render.copy()" class="name">${data.name}</div>
      <div  onclick="render.copy()" class="mac">${data.mac}</div>
      </section>`)

      templateItems.search = newData

      listbox[data.role].appendChild(templateItems)
   },

   deleteItem(id) {
      const element = User.findElementById(id)
      DeleteDataById(id)
      element.remove()
   },

   updateItem(data) {
      const element = User.findElementById(data._id)
      const dataOld = GetDataById(data._id)

      // If role changed then change location
      if (dataOld.role !== data.role) {
         const listbox = this.getListBoxs()
         listbox[data.role].appendChild(element)
      }

      // Merge Data
      Object.assign(dataOld, data)

      element.qs(`.name`).innerHTML = data.name
      element.qs(`.mac`).innerHTML = data.mac
   },

   async login() {
      // Getting HTML Files
      const loginTemplate = await (await fetch("/template/login.html")).text()
      const loginElement = HTML(loginTemplate)

      this.clearBody()
      document.body.appendChild(loginElement)
   },

   async panel() {
      const response = await ajax.getList()
      if (response.status !== 200) return Auth.error()

      const data = (await response.json()).data.list
      DATA = data

      // Getting HTML Files
      const panelTemplate = await (await fetch("/template/panel.html")).text()
      const panelElement = HTML(panelTemplate)

      // getListBoxs needs a param becaouse this penel isn't on document yet
      const listbox = this.getListBoxs(panelElement)
      data.forEach((userInfo) => this.appendItem(userInfo, listbox))

      this.clearBody()
      document.qs("body").appendChild(panelElement)
   },
})
