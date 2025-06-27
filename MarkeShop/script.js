document.addEventListener("DOMContentLoaded", () => {
  // --- Filtro por estado y búsqueda ---
  const selectEstado = document.getElementById("select-filtro-estado");
  const inputBusqueda = document.getElementById("buscador");

  const aplicarFiltros = () => {
    const estadoSeleccionado = selectEstado?.value.toLowerCase() || "todos";
    const textoBusqueda = inputBusqueda?.value.toLowerCase() || "";

    const productos = document.querySelectorAll(".product-card");

    productos.forEach(producto => {
      const claseEstado = producto.classList.contains("nuevo") ? "nuevo" :
                          producto.classList.contains("usado") ? "usado" : "otro";
      const titulo = producto.querySelector(".titulo").textContent.toLowerCase();
      const descripcion = producto.querySelector(".descripcion").textContent.toLowerCase();

      const coincideEstado = estadoSeleccionado === "todos" || claseEstado === estadoSeleccionado;
      const coincideTexto = titulo.includes(textoBusqueda) || descripcion.includes(textoBusqueda);

      producto.style.display = (coincideEstado && coincideTexto) ? "block" : "none";
    });
  };

  selectEstado?.addEventListener("change", aplicarFiltros);
  inputBusqueda?.addEventListener("input", aplicarFiltros);

  // --- Botones de compra por WhatsApp ---
  const phoneNumber = "8292308873";
  const buyButtons = document.querySelectorAll(".buy-button");

  buyButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const productCard = e.target.closest(".product-card");
      if (!productCard) return;

      const productTitle = productCard.querySelector(".titulo").textContent.trim();
      const productPrice = productCard.querySelector(".precio").textContent.trim();
      const productDescription = productCard.querySelector(".descripcion").textContent.trim();

      const mensaje = `Hola, estoy interesado en comprar:\n- Producto: ${productTitle}\n- Precio: ${productPrice}\n- Descripción: ${productDescription}`;
      const mensajeCodificado = encodeURIComponent(mensaje);
      const urlWhatsapp = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${mensajeCodificado}`;

      window.open(urlWhatsapp, "_blank");
    });
  });

  // --- Abrir/Cerrar Menú Lateral ---
  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('side-menu');

  if (menuToggle && sideMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sideMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      const isClickInsideMenu = sideMenu.contains(e.target);
      const isClickOnToggle = menuToggle.contains(e.target);

      if (!isClickInsideMenu && !isClickOnToggle) {
        sideMenu.classList.remove('open');
      }
    });
  }

  // --- Submenú de botones (si tienes alguno con .submenu-buttons) ---
  const buttons = document.querySelectorAll('.submenu-buttons button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      const targetPage = button.getAttribute('data-url');
      window.location.href = targetPage;
    });
  });

  // --- Lightbox (si tienes imágenes con .main-image) ---
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-image");
  const closeBtn = document.querySelector(".close-btn");
  let currentImages = [];
  let currentIndex = 0;

  if (lightbox && lightboxImg && closeBtn) {
    document.querySelectorAll('.main-image').forEach(img => {
      img.addEventListener('click', () => {
        currentImages = JSON.parse(img.dataset.images);
        currentIndex = 0;
        lightboxImg.src = currentImages[currentIndex];
        lightbox.style.display = "flex";
      });
    });

    lightbox.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % currentImages.length;
      lightboxImg.src = currentImages[currentIndex];
    });

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      lightbox.style.display = "none";
    });
  }

  // --- Marcar enlace activo en el menú lateral ---
  const enlaces = document.querySelectorAll(".side-menu a");
  const paginaActual = window.location.pathname.split("/").pop();

  enlaces.forEach(enlace => {
    const href = enlace.getAttribute("href");
    if (href && href.includes(paginaActual)) {
      enlace.classList.add("active");
    }
  });

  // --- Ordenar tarjetas al azar ---
  const container = document.querySelector(".container");
  const cards = Array.from(container?.children || []);
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  container.innerHTML = "";
  cards.forEach(card => container.appendChild(card));
});

