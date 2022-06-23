const render = Object.seal({
   clearBody() {
      document.qs("body").innerHTML = ""
   },

   getListBoxs(container = document.qs(`[js="listContainer"]`)) {
      if (this._getListBoxs) return _getListBoxs

      const listbox = {
         sayad: container.querySelector(`.list__box.sayad`),
         user: container.querySelector(`.list__box.user`),
         public: container.querySelector(`.list__box.public`),
      }

      this._getListBoxs = listbox
      return listbox
   },

   async login() {
      const loginTemplate = await (await fetch("/template/login.html")).text()
      const loginElement = HTML(loginTemplate)

      this.clearBody()
      document.body.appendChild(loginElement)
   },

   async panel() {
      const response = await ajax.getList()
      if (response.status !== 200) return this.error()

      const data = (await response.json()).data.list
      DATA = data
      const panelTemplate = await (await fetch("/template/panel.html")).text()
      const panelElement = HTML(panelTemplate)

      const listbox = this.getListBoxs(panelElement)
      data.forEach((userInfo) => this.appendItem(userInfo, listbox))

      this.clearBody()
      document.qs("body").appendChild(panelElement)
   },

   appendItem(data, listbox = this.getListBoxs()) {
      const templateItems = HTML(`
      <section js="list-item" class="list__box--item" data-id="${data._id}" onclick="((evt)=>{createUser.show(evt)})(this)" >
      <div class="name">${data.name}</div>
      <div class="mac">${data.mac}</div>
      </section>`)

      listbox[data.role].appendChild(templateItems)
   },

   deleteItem(id) {
      const element = createUser.findElementById(id)
      DeleteDataById(id)
      element.remove()
   },

   updateInfo(data) {
      const element = createUser.findElementById(data._id)
      const dataOld = GetDataById(data._id)

      if (dataOld.role !== data.role) {
         const listbox = this.getListBoxs()
         listbox[data.role].appendChild(element)
      }

      Object.assign(dataOld, data)

      element.qs(`.name`).innerHTML = data.name
      element.qs(`.mac`).innerHTML = data.mac
   },

   async error() {
      const loginPage = document.querySelector(`#login-page`)

      if (!loginPage) return this.login()
      alert("Wrong Auth Details")
   },
})
