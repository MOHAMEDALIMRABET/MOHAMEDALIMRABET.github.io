// Menu mobile
const navToggle = document.querySelector("#nav-toggle");
const primaryNav = document.querySelector("#primary-nav");

navToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

primaryNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    primaryNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Année courante dans le pied de page
document.querySelector("#year").textContent = new Date().getFullYear();
