document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-link");
  const overlay = document.getElementById("fullscreenOverlay");
  const fullscreenImage = document.getElementById("fullscreenImage");
  const logo = document.querySelector(".logo");

  // 🔹 1. Animación escalonada (fadeIn de cartas)
  cards.forEach((card, index) => {
    const delay = index * 0.2; // 0.2s entre cada carta
    card.style.setProperty("--animation-delay", `${delay}s`);
    card.classList.add("animate-in");
  });

  // 🔹 2. Mostrar imagen en fullscreen y luego redirigir
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

  // 🔹 3. Cerrar overlay si se hace clic fuera de la imagen
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
    }
  });

  // 🔹 4. Cerrar overlay con tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      overlay.classList.remove("active");
    }
  });

  // 🔹 5. Parpadeo del logo mientras haces scroll
  let scrollTimeout;

  window.addEventListener("scroll", () => {
    if (!logo.classList.contains("blink")) {
      logo.classList.add("blink");
    }

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      logo.classList.remove("blink");
    }, 1000); // Detener el parpadeo 1s después de dejar de hacer scroll
  });
});
