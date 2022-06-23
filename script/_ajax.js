const ajax = Object.seal({
   endpoint: "https://mac-address.herokuapp.com/api/",
   getHeaders() {
      const username = localStorage.getItem(`username`)
      const password = localStorage.getItem(`password`)

      return new Headers({ username, password })
   },

   async getList() {
      const headers = this.getHeaders()
      const init = {
         method: "GET",
         headers,
      }

      return fetch(this.endpoint, init)
   },

   async createUser(data) {
      const headers = this.getHeaders()
      headers.append("content-type", "application/json")
      const body = JSON.stringify(data)
      const init = {
         method: "POST",
         headers,
         body,
      }

      return fetch(this.endpoint, init)
   },

   async updateUser(id, data) {
      const headers = this.getHeaders()
      headers.append("content-type", "application/json")
      const body = JSON.stringify(data)
      const init = {
         method: "PATCH",
         headers,
         body,
      }

      return fetch(this.endpoint + id, init)
   },

   async deleteUser(id) {
      const headers = this.getHeaders()
      const init = {
         method: "DELETE",
         headers,
      }

      return fetch(this.endpoint + id, init)
   },
})
