document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("cart-total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty 🛒</p>";
      totalDisplay.textContent = "0";
      return;
    }

    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * (item.quantity || 1);

      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <img src="images/${item.name.toLowerCase().split(' ')[0]}.jpg" alt="${item.name}">
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>Price: $${item.price}</p>
        </div>
        <div class="cart-controls">
          <input type="number" min="1" value="${item.quantity || 1}" onchange="updateQuantity(${index}, this.value)">
          <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        </div>
      `;
      cartContainer.appendChild(div);
    });

    totalDisplay.textContent = total.toFixed(2);
  }

  renderCart();
});

function updateQuantity(index, qty) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity = parseInt(qty);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}
