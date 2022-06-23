let DATA
const GetDataById = (id) => {
   return DATA.find((element) => {
      if (element._id === id) return element
   })
}
const DeleteDataById = (id) => {
   let index
   DATA.find((element, ind) => {
      if (element._id === id) return (index = ind)
   })

   if (index == null) return

   let deleted = DATA.splice(index, 1)
   console.log({ deleted })
}

const UpdateData = (data) => {
   
   
   
   
}
