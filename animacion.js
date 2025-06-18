document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-link");
  const overlay = document.getElementById("fullscreenOverlay");
  const fullscreenImage = document.getElementById("fullscreenImage");

  // Animación escalonada (con delay usando CSS variable)
  cards.forEach((card, index) => {
    const delay = index * 0.2; // 0.2s entre cada carta
    card.style.setProperty("--animation-delay", `${delay}s`);
    card.classList.add("animate-in");
  });

  // Mostrar imagen en fullscreen + redirigir luego
  cards.forEach((card) => {
    const img = card.querySelector("img");
    const href = card.getAttribute("href");

    img.addEventListener("click", (e) => {
      e.preventDefault(); // Prevenir redirección inmediata

      fullscreenImage.src = img.src;
      overlay.classList.add("active");

      // Esperar 500ms y redirigir
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });

  // Cerrar overlay si se hace clic fuera de la imagen
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
    }
  });

  // Cerrar con tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      overlay.classList.remove("active");
    }
  });
});