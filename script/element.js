;(async () => {
   /*    const template = await (await fetch("../template/_login-page.html")).text() */
   const template = await (await fetch("../template/panel.html")).text()
   const element = HTML(template)

   document.body.appendChild(element)
})()
