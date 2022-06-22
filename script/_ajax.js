export default {
   endpoint: "https://mac-address.herokuapp.com/api/",
   getHeaders() {
      const headers = new Headers()
      headers.append("username", "NazmusSayad")
      headers.append("password", "yoboi")

      return headers
   },

   async getList() {
      const headers = this.getHeaders()
      const init = {
         method: "GET",
         headers,
      }

      const res = await fetch(this.endpoint, init)
      return res.json()
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

      const res = await fetch(this.endpoint, init)
      return res.json()
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

      const res = await fetch(this.endpoint + id, init)
      return res.json()
   },

   async deleteUser(id) {
      const headers = this.getHeaders()
      const init = {
         method: "DELETE",
         headers,
      }

      return fetch(this.endpoint + id, init)
   },
}
