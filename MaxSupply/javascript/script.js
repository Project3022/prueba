
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


// Submenú funcional si usas <a>
const submenuLinks = document.querySelectorAll('.submenu-buttons a');
submenuLinks.forEach(link => {
  link.addEventListener('click', () => {
    submenuLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

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




