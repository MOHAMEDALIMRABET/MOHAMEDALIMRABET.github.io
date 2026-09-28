// Lightbox générique : ajouter la classe "lightbox-trigger" à une image la rend cliquable pour l'agrandir.
// Nécessite la structure #lightbox / #lightbox-content / #lightbox-close (voir style.css).
(function () {
  const lightbox = document.querySelector("#lightbox");
  if (!lightbox) return;

  const content = document.querySelector("#lightbox-content");
  const closeButton = document.querySelector("#lightbox-close");

  function openLightbox(src, alt) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt || "";
    content.replaceChildren(img);
    lightbox.hidden = false;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    content.replaceChildren();
  }

  document.querySelectorAll(".lightbox-trigger").forEach((img) => {
    img.addEventListener("click", () => openLightbox(img.src, img.alt));
  });

  closeButton?.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
})();
