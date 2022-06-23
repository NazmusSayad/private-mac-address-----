const createUser = Object.seal({
   element() {
      return document.qs(`.new`)
   },

   formElements(formElement) {
      // Finding Form Element
      const name = formElement.elements[`name`]
      const mac = formElement.elements[`mac`]
      const roles = formElement.qsa(`[name="role"]`)
      const tag = formElement.elements[`tag`]
      const date = formElement.elements[`date`]
      const description = formElement.elements[`description`]

      return { name, mac, roles, tag, date, description }
   },

   show(ifElement) {
      console.trace()

      const element = this.element()
      const formElement = element.qs(`form`)
      const form_resetBtn = formElement.qs(`[type="reset"]`)

      // Resetting Form
      formElement.removeAttribute(`data-id`)
      form_resetBtn.click()
      formElement.qsa("[selected]").forEach((option) => option.removeAttribute(`selected`))

      // Update Default Date Option
      const currentDate = new Date().getDate()
      const defaultDateOptionElement = formElement.qs(`[js="defaultDateSelectOption"]`)
      defaultDateOptionElement.value = currentDate
      defaultDateOptionElement.innerHTML = currentDate + " (today)"
      defaultDateOptionElement.setAttribute(`selected`, "")

      if (ifElement) {
         const id = ifElement.dataset.id
         formElement.dataset.id = id

         const data = DATA.find((element) => {
            if (element._id === id) return element
         })

         // Forn Elements
         const formElements = this.formElements(formElement)

         // Settings Data
         formElements.name.value = data.name
         formElements.mac.value = data.mac
         if (data.tag) formElements.tag.value = data.tag
         if (data.description) formElements.description.value = data.description
         formElement.qs(`[value="${data.role}"]`).click()
         if (data.date) {
            const dateOption = formElement.qs(`option[value="${data.date}"]`)
            dateOption.setAttribute(`selected`, "")
         }
      }

      // Showing  .....
      document.qs(`body`).classList.add(`overflow-hidden`)
      element.classList.add(`opening`)
      setTimeout(() => {
         element.classList.add(`opened`)
      }, 10)
   },

   hide() {
      console.log(this)
      const element = this.element()

      // Closing
      element.classList.remove(`opened`)
      setTimeout(() => {
         document.qs(`body`).classList.remove(`overflow-hidden`)
         element.classList.remove(`opening`)
      }, 500)
   },

   toggle(ifElement) {
      const element = this.element()

      if (element.classList.contains(`opened`)) return this.hide()
      if (element.classList.contains(`opening`)) return
      this.show(ifElement)
   },

   async submit() {
      event.preventDefault()
      const form = event.target

      console.log(this)

      // Finding Form Element

      if (form.dataset.id) {
         const formElements = this.formElements(formElement)
         this.update(form, formElements)
      }
   },

   async create(FormElement) {},

   async update(FormElement, ListItem) {},

   async delete(FormElement, ListItem) {},
})
