const createUser = Object.seal({
   getModel() {
      return document.qs(`[js="createUserModel"]`)
   },
   getForm() {
      return document.qs(`[js="createUserForm"]`)
   },

   getFormElements() {
      const form = this.getForm()
      // Finding Form Element
      const name = form.elements[`name`]
      const mac = form.elements[`mac`]
      const role = form.qs(`[name="role"]:checked`)
      const tag = form.elements[`tag`]
      const date = form.elements[`date`]
      const description = form.elements[`description`]

      return { name, mac, role, tag, date, description }
   },

   findElementById(id) {
      const element = document.qs(`[data-id="${id}"]`)
      return element
   },

   enableSubmitButton() {
      const form = this.getForm()
      const button = form.qs(`[js="submitButton"]`)
      button.removeAttribute(`disabled`, "")
   },

   disableButtons() {
      const form = this.getForm()
      const buttons = form.qsa(`button[type][js]`)

      console.log(buttons)
      buttons.forEach((element) => {
         element.setAttribute(`disabled`, "")
      })
   },
   enableButtons() {
      const form = this.getForm()
      const buttons = form.qsa(`button[type][js]`)

      buttons.forEach((element) => {
         element.removeAttribute(`disabled`)
      })
   },

   show(ifElement) {
      // Elements
      const element = this.getModel()
      const form = this.getForm()
      const form_resetBtn = form.qs(`[js="resetButton"]`)
      const form_deleteBtn = form.qs(`[js="deleteButton"]`)

      // Resetting Form
      form.removeAttribute(`data-id`)
      form_resetBtn.click()
      form.qsa("[selected]").forEach((option) => option.removeAttribute(`selected`))
      form_deleteBtn.setAttribute(`disabled`, "")

      // Update Default Date Option
      const currentDate = new Date().getDate()
      const defaultDateOptionElement = form.qs(`[js="defaultDateSelectOption"]`)
      defaultDateOptionElement.value = currentDate
      defaultDateOptionElement.innerHTML = currentDate + " (today)"
      defaultDateOptionElement.setAttribute(`selected`, "")

      // If Modify Mode
      if (ifElement) {
         const id = ifElement.dataset.id
         form.dataset.id = id

         const data = GetDataById(id)

         console.log(data)
         // Forn Elements
         const formElements = this.getFormElements()

         // Settings Data
         form_deleteBtn.removeAttribute(`disabled`)
         console.log(form_deleteBtn)
         formElements.name.value = data.name
         formElements.mac.value = data.mac
         if (data.tag) formElements.tag.value = data.tag
         if (data.description) formElements.description.value = data.description
         form.qs(`[value="${data.role}"]`).click()
         if (data.date) {
            const dateOption = form.qs(`option[value="${data.date}"]`)
            dateOption.setAttribute(`selected`, "")
         }
      }

      // Opening  .....
      document.qs(`body`).classList.add(`overflow-hidden`)
      element.classList.add(`opening`)
      setTimeout(() => {
         element.classList.add(`opened`)
      }, 10)
   },

   hide() {
      const element = this.getModel()
      this.enableButtons()
      // Closing
      element.classList.remove(`opened`)
      setTimeout(() => {
         document.qs(`body`).classList.remove(`overflow-hidden`)
         element.classList.remove(`opening`)
      }, 500)
   },

   toggle(ifElement) {
      const element = this.getModel()

      if (element.classList.contains(`opened`)) return this.hide()
      if (element.classList.contains(`opening`)) return
      this.show(ifElement)
   },

   submit() {
      event.preventDefault()
      const form = this.getForm()
      this.disableButtons()

      if (form.dataset.id) {
         return this.update()
      }
      this.create()
   },

   async create() {
      console.log("I am from Create")
      const formElements = this.getFormElements()
      const name = formElements.name.value
      const mac = formElements.mac.value
      const description = formElements.description.value
      const tag = formElements.tag.value
      const date = +formElements.date.value
      const role = formElements.role.value

      const createObj = {
         name,
         mac,
         description,
         tag,
         date,
         role,
      }

      for (let key in createObj) {
         if (createObj[key] === "") delete createObj[key]
      }

      const res = await ajax.createUser(createObj)
      console.log(res)

      if (res.status === 201) {
         const data = (await res.json()).data.newUser
         this.getForm().dataset.id = data._id
         DATA.push(data)
         render.appendItem(data)
         return this.enableButtons()
      }

      if (res.status === 400) {
         alert("Duplicate MAC")
         return this.enableSubmitButton()
      }

      this.enableSubmitButton()
      alert("Maybe No Internet")
   },

   async update() {
      console.log("I am from Update")
      const formElements = this.getFormElements()
      const form = this.getForm()
      const id = form.dataset.id

      const name = formElements.name.value
      const mac = formElements.mac.value
      const description = formElements.description.value
      const tag = formElements.tag.value
      const date = +formElements.date.value
      const role = formElements.role.value

      const createObj = {
         name,
         mac,
         description,
         tag,
         date,
         role,
      }

      const res = await ajax.updateUser(id, createObj)
      if (res.status === 200) {
         const data = (await res.json()).data.user
         render.updateInfo(data)
      }

      console.log(res)

      this.enableButtons()
   },

   async delete() {
      this.disableButtons()
      const id = this.getForm().dataset.id

      const res = await ajax.deleteUser(id)
      if (res.status !== 204) return alert("Something Wrong")

      render.deleteItem(id)
      this.enableButtons()
      this.hide()
   },
})
