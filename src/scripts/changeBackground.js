function generateRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  const opacity = 70;

  body.style.setProperty("--background-body", `${color}${opacity}`);
  document
    .querySelector('meta[name = "theme-color"]')
    .setAttribute("content", color);
}
