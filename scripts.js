const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", function (info) {
  cursor.style.left = info.clientX + "px";
  cursor.style.top = info.clientY + "px";
});

const year = new Date().getFullYear();

document.querySelector(
  ".footer-text"
).innerHTML = `&copy; ${year} Pedro. Todos os direitos reservados.`;
