const validAccessCodes = new Set([
  "7X9F2KQeRt", "5Y8G1LpO9S", "3Z4H6NvB2M","012"
]);

let usedCodes = new Set(JSON.parse(localStorage.getItem("usedCodes")) || []);
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const gifts = [
  { name: "Cinta Metrica", image: "../imagen/regalo/1.jpeg" },
  { name: "Cadena Disco", image: "../imagen/regalo/2.jpg" },
  { name: "Medias Blanca", image: "../imagen/regalo/3.jpg" },
  { name: "5% Descuento", image: "../imagen/regalo/4.jpg" },
  { name: "Suerte Para La Proxima", image: "../imagen/regalo/5.jpg" },
  { name: "Medias Negras", image: "../imagen/regalo/6.jpg" },
  { name: "10% Descuento", image: "../imagen/regalo/7.jpg" },
  { name: "Pulsera", image: "../imagen/regalo/9.jpeg" },
  { name: "Suerte Para La Proxima", image: "../imagen/regalo/10.jpg" }
];

const carritoDiv = document.getElementById("carrito");
const totalSpan = document.getElementById("total");
const comprarBtn = document.getElementById("comprarBtn");

document.getElementById("submit-code").addEventListener("click", () => {
  const input = document.getElementById("access-code");
  const code = input.value.trim();

  if (!validAccessCodes.has(code)) {
    alert("⚠️ Código incorrecto. Intenta de nuevo.");
    input.focus();
    return;
  }

  if (usedCodes.has(code)) {
    alert("⚠️ Este código ya fue utilizado y no puedes abrir más regalos.");
    return;
  }

  usedCodes.add(code);
  localStorage.setItem("usedCodes", JSON.stringify(Array.from(usedCodes)));

  document.getElementById("access-code-section").style.display = "none";
  document.getElementById("game-section").style.display = "block";
  generateCards();
  renderCart();
});

function generateCards() {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  // Variable para controlar si ya se abrió una carta
  let cartaAbierta = false;

  for (let i = 0; i < 9; i++) {
    const card = document.createElement("div");
    card.className = "card";

    card.addEventListener("click", function handleClick() {
      if (cartaAbierta) return; // Si ya abrió una carta, no hacer nada
      cartaAbierta = true;

      const prize = gifts[Math.floor(Math.random() * gifts.length)];
      card.style.backgroundImage = `url('${prize.image}')`;
      card.innerHTML = `<div class="gift-name">${prize.name}</div>`;
      showGift(prize);

      // Deshabilitar clicks en todas las cartas
      disableAllCards();

      card.removeEventListener("click", handleClick);
    });

    container.appendChild(card);
  }
}

function disableAllCards() {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    card.style.cursor = "default";
    // Clonamos la carta para remover todos los event listeners de click
    const newCard = card.cloneNode(true);
    card.parentNode.replaceChild(newCard, card);
  });
}

function showGift(prize) {
  const giftDiv = document.getElementById("gift");
  giftDiv.innerHTML = `
    <h3>🎉 ¡Felicidades! Has ganado: <strong>${prize.name}</strong></h3>
    <img src="${prize.image}" alt="${prize.name}" />
  `;

  const premioProducto = {
    id: `premio-${Date.now()}`,
    name: prize.name,
    size: "Premio Gratis",
    price: 0,
    img: prize.image
  };

  if (!cart.find(item => item.name === premioProducto.name)) {
    cart.push(premioProducto);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

function renderCart() {
  carritoDiv.innerHTML = "";
  let total = 0;
  let mensaje = "Hola, quiero comprar:%0A";

  if (cart.length === 0) {
    carritoDiv.innerHTML = "<p style='text-align:center;'>🛒 Tu carrito está vacío.</p>";
    totalSpan.textContent = "0";
    comprarBtn.style.display = "none";
    return;
  }

  cart.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}">
      <div class="product-info">
        <p><strong>${product.name}</strong></p>
        <p>Descripción: ${product.size}</p>
        <p>Precio: <strong>${product.price === 0 ? "Gratis" : `$${product.price.toFixed(2)}`}</strong></p>
      </div>
      <button class="eliminar-btn" data-id="${product.id}">Eliminar</button>
    `;

    carritoDiv.appendChild(card);
    total += product.price;
    mensaje += `• ${product.name} (Descripción ${product.size}) - ${product.price === 0 ? "Gratis" : `$${product.price.toFixed(2)}`}%0A`;
  });

  totalSpan.textContent = total.toFixed(2);
  comprarBtn.href = `https://wa.me/8292308873?text=${mensaje}`;
  comprarBtn.style.display = "inline-block";

  document.querySelectorAll(".eliminar-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      cart = cart.filter(product => product.id != id);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    });
  });
}

renderCart();
