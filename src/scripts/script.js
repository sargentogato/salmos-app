function today() {
  const date = new Date()
  const d = date.getDate()
  const m = date.getMonth() + 1
  const y = date.getFullYear()

  return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d)
}

function tomorrow() {
  const date = new Date()
  const d = date.getDate() + 1
  const m = date.getMonth() + 1
  const y = date.getFullYear()

  return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d)
}

function drawSalmo(salmo) {
  const app = document.getElementById("app")
  generateRandomColor()

  app.innerHTML = `
  <div id="main" class="main">
    <h1 class="main__title">${salmo.title}</h1>
    <div class="main__date">${salmo.date}</div>
    <div class="main__salmo">${salmo.content}</div>
  </div>
  `
}

function cleanText(text) {
  const reg = /\[.+?]]/g

  return text.replace(reg, "")
}

function callData() {
  //FR para otro idioma
  const salmosBook = 1
  console.log(tomorrow())
  const url = `https://publication.evangelizo.ws/SP/days/${today()}`

  const data = fetch(url)
    .then((response) => response.json())
    .then((result) => {
      console.log(result.data)
      let salmos = {
        date: result.data.date_displayed,
        content: cleanText(result.data.readings[salmosBook].text),
        title: result.data.readings[1].title,
      }

      drawSalmo(salmos)
    })
    .catch((error) => console.log("error", error))
}

callData()
