const render = Object.seal({
   clearBody() {
      document.qs("body").innerHTML = ""
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

      const listbox = {
         sayad: panelElement.querySelector(`.list__box.sayad`),
         user: panelElement.querySelector(`.list__box.user`),
         public: panelElement.querySelector(`.list__box.public`),
      }

      console.log(listbox)

      data.forEach((userInfo) => {
         const templateItems = HTML(`
         <section js="list-item" class="list__box--item" data-id="${userInfo._id}" onclick="((evt)=>{createUser.show(evt)})(this)" >
         <div class="name">${userInfo.name}</div>
         <div class="mac">${userInfo.mac}</div>
         </section>`)

         listbox[userInfo.role].appendChild(templateItems)
      })

      this.clearBody()
      document.qs("body").appendChild(panelElement)
   },

   async error() {
      const loginPage = document.querySelector(`#login-page`)

      if (!loginPage) return this.login()
      alert("Wrong Auth Details")
   },
})
