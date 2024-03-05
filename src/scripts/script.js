function today() {
  const date = new Date();
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
}

function tomorrow() {
  const date = new Date();
  const d = date.getDate() + 1;
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
}

function drawSalmo({ title, date, content }) {
  const app = document.getElementById("app");
  generateRandomColor();

  app.innerHTML = `
  <div id="main" class="main">
    <h1 class="main__title">${title}</h1>
    <div class="main__date">${date}</div>
    <div class="main__salmo">${content}</div>
  </div>
  `;
}

function cleanText(text) {
  const reg = /\[.+?]]/g;

  return text.replace(reg, "");
}

function callData() {
  //FR para otro idioma
  const salmosBook = 1;
  const url = `https://publication.evangelizo.ws/SP/days/${today()}`;

  try {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          console.log(
            "Promise resolved and HTTP status successful:",
            response.status,
          );

          return response.json();
        } else {
          if (response.status === 404)
            throw new Error("404, Resourse not found. Review url");
          if (response.status === 500)
            throw new Error("500, Internal server error");
          throw new Error("Other error", response.status);
        }
      })
      .then(({ data: { date_displayed, readings } }) => {
        let salmos = {
          date: date_displayed,
          content: cleanText(readings[salmosBook].text),
          title: readings[1].title,
        };

        drawSalmo(salmos);
      });
  } catch {
    console.error("Promise rejected");
  }
}

callData();
