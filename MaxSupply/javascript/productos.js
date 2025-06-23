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


function addToFavorites(product) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  // Verificar si el producto ya está en favoritos (puedes comparar por nombre o por ID si tienes uno)
  const exists = favoritos.some(fav => fav.name === product.name && fav.size === product.size);
  if (!exists) {
    favoritos.push(product);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    alert(`${product.name} guardado en favoritos 💖`);
  } else {
    alert(`${product.name} ya está en favoritos.`);
  }
}



document.querySelectorAll(".product-card").forEach(card => {
  let selectedTalla = null; // 🔴 esta variable vive dentro del scope del producto

  const tallas = card.querySelectorAll(".talla");
  tallas.forEach(span => {
    span.addEventListener("click", () => {
      tallas.forEach(t => t.classList.remove("selected"));
      span.classList.add("selected");
      selectedTalla = span.dataset.talla; // ✅ guarda la talla seleccionada
    });
  });

  const addToCartBtn = card.querySelector(".add-to-cart");
  addToCartBtn.addEventListener("click", () => {
    if (!selectedTalla) return; // ✅ verifica si hay talla seleccionada

    const product = {
      id: Date.now(),
      name: "Top Vital Seamless",
      size: selectedTalla,
      price: 1500,
      img: card.querySelector("img").src
    };

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  });
});

// Función para renderizar favoritos
function renderFavorites() {
  const favoriteList = document.getElementById('favoriteList');
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  if (favoritos.length === 0) {
    favoriteList.innerHTML = '<p>No tienes productos favoritos aún.</p>';
    return;
  }

  favoriteList.innerHTML = '';

  favoritos.forEach(product => {
    const card = document.createElement('div');
    card.className = 'favorite-card';

    card.innerHTML = `
      <button class="remove-btn" title="Eliminar favorito" data-id="${product.id}">&times;</button>
      <img src="${product.img}" alt="${product.name}" />
      <div class="favorite-info">
        <h3>${product.name}</h3>
        <p>Precio: <strong>$${product.price.toFixed(2)}</strong></p>
      </div>
    `;

    favoriteList.appendChild(card);
  });

  // Asignar evento para eliminar favorito usando data-id
  favoriteList.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
      const id = btn.getAttribute('data-id');
      favoritos = favoritos.filter(product => product.id != id);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      alert("Producto eliminado de favoritos");
      renderFavorites();
    });
  });
}

// Función para agregar a favoritos, asegurando id único
function addToFavorites(product) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  // Si no tiene id, le asignamos uno único
  if (!product.id) {
    product.id = Date.now() + Math.random();
  }

  const exists = favoritos.some(fav => fav.id === product.id);

  if (!exists) {
    favoritos.push(product);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    alert(`${product.name} guardado en favoritos 💖`);
  } else {
    alert(`${product.name} ya está en favoritos.`);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  document.querySelectorAll('.favorite-icon').forEach(icon => {
    const id = icon.dataset.id;

    // Verifica si el producto ya está en favoritos
    const isFavorito = favoritos.some(fav => String(fav.id) === String(id));
    if (isFavorito) {
      icon.classList.add('saved');
    }

    // Agrega el event listener para añadir o quitar de favoritos
    icon.addEventListener('click', () => {
      const card = icon.closest('.product-card');
      const name = card.querySelector('.tituloo')?.innerText || 'Sin nombre';
      const priceText = card.querySelector('.precio strong')?.innerText || '$0';
      const price = parseFloat(priceText.replace('$', '')) || 0;
      const img = card.querySelector('img')?.src || '';
      const description = card.querySelector('.tallas')?.innerText || '';
      const buyLink = card.querySelector('.buy-button')?.href || '#';
      const product = { id, name, price, img, description, buyLink };

      let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
      const index = favoritos.findIndex(fav => String(fav.id) === String(id));

      if (index === -1) {
        favoritos.push(product);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        icon.classList.add('saved');
        alert(`${name} guardado en favoritos 💖`);
      } else {
        favoritos.splice(index, 1);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        icon.classList.remove('saved');
        alert(`${name} eliminado de favoritos`);
      }
    });
  });
});



icon.addEventListener('click', () => {
  const card = icon.closest('.product-card');
  const id = icon.dataset.id;
  const name = card.querySelector('.tituloo')?.innerText || 'Sin nombre';
  const priceText = card.querySelector('.precio strong')?.innerText || '$0';
  const price = parseFloat(priceText.replace('$', '')) || 0;
  const img = card.querySelector('img')?.src || '';
  const description = card.querySelector('.tallas')?.innerText || '';
  const buyLink = card.querySelector('.buy-button')?.href || '#';
  const product = { id, name, price, img, description, buyLink };

  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  const index = favoritos.findIndex(fav => fav.id == id);

  if (index === -1) {
    favoritos.push(product);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    icon.classList.add('saved');
    alert(`${name} guardado en favoritos 💖`);
  } else {
    favoritos.splice(index, 1);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    icon.classList.remove('saved');
    alert(`${name} eliminado de favoritos`);
  }
});




