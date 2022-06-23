const HTML = (body) => {
   const element = document.createElement("template")
   element.innerHTML = body
   return element.content.firstElementChild
}

const SLEEP = (duration) => {
   return new Promise((resolve) => {
      setTimeout(resolve, duration)
   })
}