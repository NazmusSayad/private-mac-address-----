const Auth = Object.seal({
   submit() {
      // -------  console.log(e)

      event.preventDefault()
      const form = event.target

      // Get Username && Password from Form
      const username = form.elements[`username`].value
      const password = form.elements[`password`].value

      localStorage.setItem(`username`, username)
      localStorage.setItem(`password`, password)

      const button = form.elements["button"]
      button.setAttribute(`disabled`, "")

      render.panel()
   },

   error() {
      const loginPage = document.querySelector(`#login-page`) // LoginPage is available on Document

      if (!loginPage) return render.login()
      alert("Wrong Auth Details")
   },
})
