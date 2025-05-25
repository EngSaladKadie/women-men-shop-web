// Check authentication status on admin page load
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    window.location.href = "user.html";
  }

  // Load dashboard data
  loadDashboardData();

  // Add logout handler for admin page
  document.getElementById("admin-logout").addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "user.html";
  });

  // Initialize modal functionality
  initModal();

  // Calculate profit when cost or price changes
  document
    .getElementById("product-price")
    .addEventListener("input", calculateProfit);
  document
    .getElementById("product-cost")
    .addEventListener("input", calculateProfit);
});

function calculateProfit() {
  const price = parseFloat(document.getElementById("product-price").value) || 0;
  const cost = parseFloat(document.getElementById("product-cost").value) || 0;
  const profit = price - cost;
  document.getElementById("product-profit").value = profit.toFixed(2);
}

function initModal() {
  const modal = document.getElementById("product-modal");
  const addBtn = document.getElementById("add-product-btn");
  const closeBtn = document.querySelector(".close-modal");
  const cancelBtn = document.querySelector(".btn.cancel");

  addBtn.addEventListener("click", () => {
    document.getElementById("modal-title").textContent = "Add New Product";
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Handle image preview
  document
    .getElementById("product-images")
    .addEventListener("change", function (e) {
      const preview = document.getElementById("image-preview");
      preview.innerHTML = "";

      for (const file of e.target.files) {
        if (file.type.match("image.*")) {
          const reader = new FileReader();

          reader.onload = function (e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            preview.appendChild(img);
          };

          reader.readAsDataURL(file);
        }
      }
    });
}

function loadDashboardData() {
  // In a real app, you would fetch this from a server API
  const products = [
    {
      id: 1,
      name: "Air Runner Pro",
      sku: "SHO-001",
      price: 129.99,
      cost: 75.5,
      category: "running",
      brand: "Nike",
      colors: ["Red", "Black", "White"],
      sizes: [8, 9, 10, 11],
      description: "High-performance running shoes with advanced cushioning",
      image: "./asset/m2.avif",
      stock: 45,
      sales: 120,
    },
    {
      id: 2,
      name: "Street Comfort",
      sku: "SHO-002",
      price: 89.99,
      cost: 50.0,
      category: "casual",
      brand: "Adidas",
      colors: ["Blue", "White", "Gray"],
      sizes: [7, 8, 9, 10, 11],
      description: "Casual shoes for everyday comfort and style",
      image: "./asset/m3.avif",
      stock: 78,
      sales: 95,
    },
    {
      id: 3,
      name: "Bounce Supreme",
      sku: "SHO-003",
      price: 149.99,
      cost: 85.75,
      category: "basketball",
      brand: "Jordan",
      colors: ["Black", "Red"],
      sizes: [9, 10, 11, 12],
      description: "Professional basketball shoes with superior ankle support",
      image: "./asset/w2.avif",
      stock: 32,
      sales: 68,
    },
    {
      id: 4,
      name: "Turbo Sprint",
      sku: "SHO-004",
      price: 79.99,
      cost: 45.25,
      category: "soccer",
      brand: "Puma",
      colors: ["Black", "White", "Yellow"],
      sizes: [6, 7, 8, 9],
      description: "Lightweight soccer cleats for maximum speed",
      image: "./asset/w6.avif",
      stock: 56,
      sales: 42,
    },
  ];

  const transactions = [
    {
      id: 1001,
      customer: "John Smith",
      date: "2023-06-15",
      amount: 259.98,
      status: "completed",
      items: 2,
    },
    {
      id: 1002,
      customer: "Sarah Johnson",
      date: "2023-06-14",
      amount: 149.99,
      status: "shipped",
      items: 1,
    },
    {
      id: 1003,
      customer: "Mike Brown",
      date: "2023-06-14",
      amount: 329.97,
      status: "processing",
      items: 3,
    },
    {
      id: 1004,
      customer: "Emily Davis",
      date: "2023-06-13",
      amount: 89.99,
      status: "completed",
      items: 1,
    },
    {
      id: 1005,
      customer: "David Wilson",
      date: "2023-06-12",
      amount: 179.98,
      status: "completed",
      items: 2,
    },
  ];

  // Load products
  const productsList = document.getElementById("products-list");
  productsList.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="product-actions">
                            <button class="btn-icon edit"><i class="fas fa-edit"></i></button>
                            <button class="btn-icon delete"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="product-sku">${product.sku}</p>
                        <div class="product-meta">
                            <span class="price">$${product.price.toFixed(
                              2
                            )}</span>
                            <span class="stock">${product.stock} in stock</span>
                        </div>
                        <div class="product-tags">
                            <span class="tag category">${
                              product.category
                            }</span>
                            <span class="tag brand">${product.brand}</span>
                        </div>
                    </div>
                `;
    productsList.appendChild(productCard);
  });

  // Load top products
  const topProducts = [...products]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 3);
  const topProductsList = document.getElementById("top-products");
  topProductsList.innerHTML = "";

  topProducts.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.className = "top-product-item";
    productItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-details">
                        <h4>${product.name}</h4>
                        <div class="sales-info">
                            <span>$${product.price.toFixed(2)}</span>
                            <span>${product.sales} sold</span>
                        </div>
                    </div>
                `;
    topProductsList.appendChild(productItem);
  });

  // Load transactions
  const transactionsList = document.getElementById("transactions-list");
  transactionsList.innerHTML = "";

  transactions.forEach((transaction) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>#${transaction.id}</td>
                    <td>${transaction.customer}</td>
                    <td>${transaction.date}</td>
                    <td>$${transaction.amount.toFixed(2)}</td>
                    <td><span class="status ${transaction.status}">${
      transaction.status
    }</span></td>
                    <td><button class="btn small">View</button></td>
                `;
    transactionsList.appendChild(row);
  });
}
