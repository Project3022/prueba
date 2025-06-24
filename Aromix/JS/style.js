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

// MODAL DE IMAGEN
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

modalClose?.addEventListener('click', () => {
  modal.style.display = "none";
});

modal?.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = "none";
});

// REDIRECCIÓN A WHATSAPP CON MENSAJE
const whatsappNumber = "8495194977";

document.querySelectorAll('.product-card').forEach(card => {
  const button = card.querySelector('.buy-button');
  const titulo = card.querySelector('.tituloo')?.textContent;
  const precio = card.querySelector('.precio')?.textContent;

  button?.addEventListener('click', e => {
    e.preventDefault();
    const mensaje = `Hola! Estoy interesado en comprar ${titulo} por ${precio}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  });
});
