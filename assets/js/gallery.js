const grid = document.querySelector("#gallery-grid");
const filtersBar = document.querySelector("#gallery-filters");
const emptyMessage = document.querySelector("#gallery-empty");
const lightbox = document.querySelector("#lightbox");
const lightboxContent = document.querySelector("#lightbox-content");
const lightboxClose = document.querySelector("#lightbox-close");

const TYPE_ICONS = {
  image: "🖼️",
  video: "🎬",
  pdf: "📄",
  word: "📝",
  json: "🧾",
  csv: "📊",
};

const TYPE_LABELS = {
  image: "Image",
  video: "Vidéo",
  pdf: "PDF",
  word: "Document Word",
  json: "Données JSON",
  csv: "Données CSV",
};

let activeProject = "Tous";

function openLightbox(node) {
  lightboxContent.replaceChildren(node);
  lightbox.hidden = false;
}

function closeLightbox() {
  lightbox.hidden = true;
  lightboxContent.replaceChildren();
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

function buildCard(item) {
  const card = document.createElement("article");
  card.className = "gallery-card";

  const media = document.createElement("div");
  media.className = "gallery-media";

  if (item.type === "image") {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.titre;
    img.loading = "lazy";
    img.addEventListener("click", () => {
      const big = document.createElement("img");
      big.src = item.src;
      big.alt = item.titre;
      openLightbox(big);
    });
    media.append(img);
  } else if (item.type === "video" && item.provider) {
    // Vidéo externe (YouTube/Vimeo) : uniquement si "provider" est renseigné.
    const iframe = document.createElement("iframe");
    iframe.src = item.src;
    iframe.title = item.titre;
    iframe.loading = "lazy";
    iframe.allowFullscreen = true;
    media.append(iframe);
  } else if (item.type === "video") {
    // Vidéo hébergée directement dans le portfolio (assets/gallery/...).
    const video = document.createElement("video");
    video.src = item.src;
    video.controls = true;
    video.preload = "metadata";
    media.append(video);
  } else {
    const link = document.createElement("a");
    link.href = item.src;
    link.target = "_blank";
    link.rel = "noopener";
    link.className = "gallery-file-link";
    const icon = document.createElement("span");
    icon.className = "gallery-file-icon";
    icon.textContent = TYPE_ICONS[item.type] || "📁";
    const label = document.createElement("span");
    label.textContent = `Ouvrir (${TYPE_LABELS[item.type] || item.type})`;
    link.append(icon, label);
    media.append(link);
  }

  const body = document.createElement("div");
  body.className = "gallery-body";
  const tag = document.createElement("span");
  tag.className = "tag tag-progress";
  tag.textContent = item.specialite || item.projet;
  const title = document.createElement("h3");
  title.textContent = item.titre;
  const description = document.createElement("p");
  description.textContent = item.description || "";
  body.append(tag, title, description);

  card.append(media, body);
  return card;
}

function render(items) {
  const filtered = items.filter(
    (item) => activeProject === "Tous" || item.projet === activeProject
  );
  grid.replaceChildren(...filtered.map(buildCard));
  emptyMessage.hidden = filtered.length > 0;
}

function buildFilters(items) {
  const projects = ["Tous", ...new Set(items.map((item) => item.projet))];
  filtersBar.replaceChildren(...projects.map((projet) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-chip" + (projet === activeProject ? " active" : "");
    button.textContent = projet;
    button.addEventListener("click", () => {
      activeProject = projet;
      filtersBar.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.remove("active"));
      button.classList.add("active");
      render(items);
    });
    return button;
  }));
}

fetch("assets/data/gallery.json")
  .then((response) => response.json())
  .then((items) => {
    buildFilters(items);
    render(items);
  })
  .catch(() => {
    emptyMessage.hidden = false;
    emptyMessage.textContent = "Impossible de charger la galerie (ouvrez le site via un serveur local, pas en double-cliquant sur le fichier).";
  });
