// Carrusel
window.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach((carousel) => {
    const products = Array.from(carousel.children);

    // Mezclar productos
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    shuffle(products);
    carousel.innerHTML = '';
    products.forEach(product => carousel.appendChild(product));

    const totalProducts = products.length;
    const visibleCount = 3;
    let currentIndex = 0;

    if (totalProducts <= visibleCount) return;

    carousel.style.transform = `translateX(0%)`;

    function slideCarousel() {
      currentIndex++;
      if (currentIndex > totalProducts - visibleCount) {
        currentIndex = 0;
      }
      const translateX = -(currentIndex * (100 / visibleCount));
      carousel.style.transform = `translateX(${translateX}%)`;
    }

    setTimeout(slideCarousel, 100);
    setInterval(slideCarousel, 3000);
  });
});



const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');

menuToggle.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
});

// Cierra el menú si haces clic fuera del botón o del menú
document.addEventListener('click', (event) => {
  const isClickInsideMenu = sideMenu.contains(event.target);
  const isClickOnToggle = menuToggle.contains(event.target);

  if (!isClickInsideMenu && !isClickOnToggle) {
    sideMenu.classList.remove('open');
  }
});


  const buttons = document.querySelectorAll('.submenu-buttons button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');

      const targetPage = button.getAttribute('data-url');
      window.location.href = targetPage; // Redirección
    });
  });





const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll('.product-card img').forEach(img => {
  img.addEventListener('click', () => {
    modal.style.display = "block";
    modalImg.src = img.src;
    modalImg.alt = img.alt;
  });
});

modalClose.addEventListener('click', () => {
  modal.style.display = "none";
});

modal.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = "none";
});


document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".product-card");

    const selectedTalla = card.querySelector(".product-info .talla.selected");
    let size = selectedTalla ? selectedTalla.dataset.talla : null;

    let name = card.querySelector(".tituloo")?.innerText || card.querySelector("img").alt || "Producto";
    let description = card.querySelector(".tallas")?.innerText || "";

    const priceText = card.querySelector(".precio strong").innerText;
    const price = parseFloat(priceText.replace("$", ""));

    const img = card.querySelector("img").src;

    // Si no hay talla seleccionada y el producto tiene tallas,
    // puedes asignar la primera talla automáticamente (para evitar null)
    if (!size) {
      const firstTalla = card.querySelector(".product-info .talla");
      size = firstTalla ? firstTalla.dataset.talla : description;
    }

    const id = Date.now() + Math.random();

    const product = { id, img, name, size, price };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} (Detalle: ${size}) agregado al carrito`);
    renderCart();
  });
});





document.querySelectorAll(".product-card").forEach(card => {
  const tallas = card.querySelectorAll(".talla");

  tallas.forEach(span => {
    span.addEventListener("click", () => {
      // Quita selección anterior
      tallas.forEach(t => t.classList.remove("selected"));
      // Aplica a la seleccionada
      span.classList.add("selected");
    });
  });
});

  const addToCartBtn = card.querySelector(".add-to-cart");
  addToCartBtn.addEventListener("click", () => {
    if (!selectedTalla) {
      return;
    }

    const product = {
      id: Date.now(),
      name: "Top Vital Seamless", // Puedes hacer esto dinámico si hay varios productos
      size: selectedTalla,
      price: 1500,
      img: card.querySelector("img").src
    };

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  });

