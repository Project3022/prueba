// Mostrar u ocultar productos según filtro
function mostrarProductos(filtro) {
  const productos = document.querySelectorAll('.product-card');

  productos.forEach(producto => {
    if (filtro === 'todos') {
      producto.style.display = 'block';
    } else if (producto.classList.contains(filtro)) {
      producto.style.display = 'block';
    } else {
      producto.style.display = 'none';
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const selectEstado = document.getElementById("select-filtro-estado");
  const inputBusqueda = document.getElementById("buscador");

  const aplicarFiltros = () => {
    const estadoSeleccionado = selectEstado.value.toLowerCase();
    const textoBusqueda = inputBusqueda.value.toLowerCase();

    const productos = document.querySelectorAll(".product-card");

    productos.forEach(producto => {
      const claseEstado = producto.classList.contains("nuevo") ? "nuevo" : 
                          producto.classList.contains("usado") ? "usado" : "otro";
      const titulo = producto.querySelector(".titulo").textContent.toLowerCase();
      const descripcion = producto.querySelector(".descripcion").textContent.toLowerCase();

      const coincideEstado = estadoSeleccionado === "todos" || claseEstado === estadoSeleccionado;
      const coincideTexto = titulo.includes(textoBusqueda) || descripcion.includes(textoBusqueda);

      if (coincideEstado && coincideTexto) {
        producto.style.display = "block";
      } else {
        producto.style.display = "none";
      }
    });
  };

  // Escuchar cambios
  if (selectEstado) {
    selectEstado.addEventListener("change", aplicarFiltros);
  }

  if (inputBusqueda) {
    inputBusqueda.addEventListener("input", aplicarFiltros);
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const phoneNumber = "8292308873"; // Cambia por tu número con código país

  const buyButtons = document.querySelectorAll(".buy-button");

  buyButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const productCard = e.target.closest(".product-card");
      if (!productCard) return;

      const productTitle = productCard.querySelector(".titulo").textContent.trim();
      const productPrice = productCard.querySelector(".precio").textContent.trim();
      const productDescription = productCard.querySelector(".descripcion").textContent.trim();

      const mensaje = `Hola, estoy interesado en comprar:
- Producto: ${productTitle}
- Precio: ${productPrice}
- Descripción: ${productDescription}`;

      const mensajeCodificado = encodeURIComponent(mensaje);
      const urlWhatsapp = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${mensajeCodificado}`;

      window.open(urlWhatsapp, "_blank");
    });
  });
});


const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');

// Abrir/cerrar el menú al hacer clic en el botón
menuToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // Evita que dispare el evento del documento
  sideMenu.classList.toggle('open');
});

// Cierra el menú si se hace clic fuera del mismo
document.addEventListener('click', (e) => {
  const isClickInsideMenu = sideMenu.contains(e.target);
  const isClickOnToggle = menuToggle.contains(e.target);

  if (!isClickInsideMenu && !isClickOnToggle) {
    sideMenu.classList.remove('open');
  }
});

// SUBMENÚ DE BOTONES
const buttons = document.querySelectorAll('.submenu-buttons button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    const targetPage = button.getAttribute('data-url');
    window.location.href = targetPage;
  });
});



  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-image");
  const closeBtn = document.querySelector(".close-btn");
  let currentImages = [];
  let currentIndex = 0;

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
document.addEventListener("DOMContentLoaded", () => {
    const enlaces = document.querySelectorAll(".side-menu a");
    const paginaActual = window.location.pathname.split("/").pop();

    enlaces.forEach(enlace => {
      const href = enlace.getAttribute("href");
      if (href && href.includes(paginaActual)) {
        enlace.classList.add("active");
      }
    });
  });


