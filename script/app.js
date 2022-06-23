let DATA
const GetDataById = (id) => {
   return DATA.find((element) => {
      if (element._id === id) return element
   })
}
const DeleteDataById = (id) => {
   let index
   
   // Find this element and get that index
   DATA.find((element, ind) => {
      if (element._id === id) return (index = ind)
   })

   if (index == null) return

   DATA.splice(index, 1)
}

if (localStorage.getItem(`username`) && localStorage.getItem(`password`)) Render.panel()
else Render.login()