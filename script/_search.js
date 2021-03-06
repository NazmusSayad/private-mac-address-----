const Search = {
   elements() {
      return document.qsa(`[js="list-item"]`)
   },

   execute(input) {
      if (!input.value) {
         return this.elements().forEach((element) => {
            element.removeAttribute(`style`)
         })
      }

      this.elements().forEach((element) => {
         const fuse = new Fuse([element.search])

         const pattern = input.value
         const result = fuse.search(pattern)

         if (result.length) return element.removeAttribute(`style`)
         element.style.display = "none"
      })
   },

   submit() {
      clearTimeout(this._timeout)

      let input = event.target
      this._timeout = setTimeout(() => {
         this.execute(input)
      }, 350)
   },
}
