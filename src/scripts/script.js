import { SHUFFLED_PSALMS } from "../data/shuffle_salms.js";

function today() {
  const date = new Date();
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();

  return (d <= 9 ? "0" + d : d) + "-" + (m <= 9 ? "0" + m : m) + "-" + y;
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
  const url = "src/data/salmos.json";

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
          throw new Error(`Error fetching local JSON: ${response.status}`);
        }
      })
      .then((salmosData) => {
        console.log("DATA:", salmosData);

        const startDate = new Date(2024, 0, 1);
        startDate.setHours(0, 0, 0, 0); // Fecha ancla
        const actualDay = new Date();
        actualDay.setHours(0, 0, 0, 0);

        console.log("startDate:", startDate, "today:", actualDay);

        const diffTime = Math.abs(actualDay - startDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        const index = diffDays % SHUFFLED_PSALMS.length;
        console.log("🚀 ~ callData ~ index:", index);

        const randomSalmo = salmosData[index];
        console.log("randomSalmo:", randomSalmo);

        let salmo = {
          date: today(),
          content: cleanText(randomSalmo.contenido),
          title: randomSalmo.titulo,
        };

        drawSalmo(salmo);
      });
  } catch (error) {
    console.error("Error reading or processing local JSON:", error);
  }
}

callData();
