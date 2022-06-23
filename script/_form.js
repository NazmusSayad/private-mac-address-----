const form = Object.seal({
   login(e) {
      console.log(e)

      event.preventDefault()
      const form = event.target

      const username = form.elements[`username`].value
      const password = form.elements[`password`].value

      localStorage.setItem(`username`, username)
      localStorage.setItem(`password`, password)

      const button = form.elements["button"]
      button.setAttribute(`disabled`, "")

      render.panel()
   },


})
