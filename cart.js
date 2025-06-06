// ===== DOM Elements =====
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const cartCount = document.querySelector(".cart-count");
const cartView = document.getElementById("cartView");
const paymentView = document.getElementById("paymentView");
const orderConfirmation = document.getElementById("orderConfirmation");
const checkoutBtn = document.getElementById("checkoutBtn");
const backToCart = document.getElementById("backToCart");
const placeOrderBtn = document.getElementById("placeOrderBtn");
const cartItemsContainer = document.getElementById("cartItems");
const paymentMethods = document.querySelectorAll(".payment-method-radio");
const paymentForms = document.querySelectorAll(".payment-form");

// ===== Cart Data =====
let cart = [
  {
    id: 1,
    title: "Premium Runner",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    quantity: 1,
    size: "M",
  },
  {
    id: 2,
    title: "Classic Leather",
    price: 159.99,
    image:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    quantity: 2,
    size: "L",
  },
];

// ===== Initialize Page =====
document.addEventListener("DOMContentLoaded", () => {
  // Load cart from localStorage if available
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }

  updateCart();

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Checkout button
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    cartView.style.display = "none";
    paymentView.style.display = "block";
    updatePaymentSummary();
  });

  // Back to cart button
  backToCart.addEventListener("click", () => {
    paymentView.style.display = "none";
    cartView.style.display = "block";
  });

  // Place order button
  placeOrderBtn.addEventListener("click", () => {
    processPayment();
  });

  // Payment method selection
  paymentMethods.forEach((method) => {
    method.addEventListener("change", () => {
      paymentForms.forEach((form) => (form.style.display = "none"));
      document.getElementById(`${method.id}Form`).style.display = "block";
    });
  });
});

// ===== Update Cart Display =====
function updateCartDisplay() {
  const emptyCart = document.querySelector(".empty-cart");
  // Clear current items (all except the empty cart div)
  cartItemsContainer
    .querySelectorAll(".cart-item")
    .forEach((item) => item.remove());

  if (cart.length === 0) {
    emptyCart.style.display = "block";
    // Update summary to zero
    updateSummary(0, 0, 0);
    return;
  }

  emptyCart.style.display = "none";

  // Add cart items dynamically
  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
                <img src="${item.image}" alt="${
      item.title
    }" class="cart-item-img">
                <div class="cart-item-details">
                    <div>
                        <h3 class="cart-item-title">${item.title}</h3>
                        <p>Size: ${item.size}</p>
                        <p class="cart-item-price">$${(
                          item.price * item.quantity
                        ).toFixed(2)}</p>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn minus"><i class="fas fa-minus"></i></button>
                        <input type="number" value="${
                          item.quantity
                        }" min="1" class="quantity-input">
                        <button class="quantity-btn plus"><i class="fas fa-plus"></i></button>
                    </div>
                    <span class="remove-item">Remove</span>
                </div>
            `;

    // Add event listeners for quantity controls and remove button
    const minusBtn = cartItem.querySelector(".minus");
    const plusBtn = cartItem.querySelector(".plus");
    const quantityInput = cartItem.querySelector(".quantity-input");
    const removeBtn = cartItem.querySelector(".remove-item");

    minusBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        quantityInput.value = item.quantity;
        updateCart();
      }
    });

    plusBtn.addEventListener("click", () => {
      item.quantity++;
      quantityInput.value = item.quantity;
      updateCart();
    });

    quantityInput.addEventListener("change", () => {
      let val = parseInt(quantityInput.value);
      if (isNaN(val) || val < 1) {
        quantityInput.value = item.quantity;
      } else {
        item.quantity = val;
        updateCart();
      }
    });

    removeBtn.addEventListener("click", () => {
      cart.splice(index, 1);
      updateCart();
    });

    cartItemsContainer.appendChild(cartItem);
  });

  // Update summary with current totals
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  updateSummary(subtotal, tax, total);
}

function updateSummary(subtotal, tax, total) {
  const summarySubtotal = document.querySelector(
    ".summary-row:nth-child(1) span:last-child"
  );
  const summaryTax = document.querySelector(
    ".summary-row:nth-child(3) span:last-child"
  );
  const summaryTotal = document.querySelector(".summary-total span:last-child");

  if (summarySubtotal && summaryTax && summaryTotal) {
    summarySubtotal.textContent = `$${subtotal.toFixed(2)}`;
    summaryTax.textContent = `$${tax.toFixed(2)}`;
    summaryTotal.textContent = `$${total.toFixed(2)}`;
  }
}

// ===== Update Payment Summary =====
function updatePaymentSummary() {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  document.getElementById("paymentSubtotal").textContent = `$${subtotal.toFixed(
    2
  )}`;
  document.getElementById("paymentTax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("paymentTotal").textContent = `$${total.toFixed(2)}`;
}

// ===== Process Payment =====
function processPayment() {
  // In a real app, validate form and process payment here

  placeOrderBtn.disabled = true;
  placeOrderBtn.textContent = "Processing...";

  setTimeout(() => {
    paymentView.style.display = "none";
    orderConfirmation.style.display = "block";

    // Clear cart
    cart = [];
    saveCart();
    updateCartCount();

    placeOrderBtn.disabled = false;
    placeOrderBtn.textContent = "Place Order";
  }, 2000);
}

// ===== Update Cart Count =====
function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
  saveCart();
}

// ===== Save Cart to localStorage =====
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ===== Update Cart (display + count) =====
function updateCart() {
  updateCartDisplay();
  updateCartCount();
}


  // Elements
   // PayPal Integration
