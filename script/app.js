;(async () => {
   if (localStorage.getItem(`username`) && localStorage.getItem(`password`)) return render.panel()
   render.login()
})()
