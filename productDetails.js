// DOM Elements
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');
const sizeOptions = document.querySelectorAll('.size-option');
const quantityInput = document.querySelector('.quantity-input');
const minusBtn = document.querySelector('.minus');
const plusBtn = document.querySelector('.plus');
const addToCartBtn = document.querySelector('.add-to-cart-btn');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

// Product data from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Sample product data (in a real app, this would come from an API)
const product = {
    id: 1,
    name: 'Premium Runner',
    price: 129.99,
    description: 'Lightweight running shoes with premium cushioning technology for maximum comfort during your runs. Features breathable mesh upper and durable rubber outsole.',
    images: [
        'images/products/shoe1.jpg',
        'images/products/shoe1-alt1.jpg',
        'images/products/shoe1-alt2.jpg',
        'images/products/shoe1-alt3.jpg'
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    details: {
        material: 'Mesh upper, synthetic overlays, rubber outsole',
        weight: '280g (per shoe in size 9)',
        closure: 'Lace-up',
        color: 'Black/White/Red',
        origin: 'Designed in USA, Made in Vietnam'
    }
};

// Related products
const relatedProducts = [
    {
        id: 2,
        name: 'Classic Leather',
        price: 159.99,
        image: 'images/products/shoe2.jpg'
    },
    {
        id: 5,
        name: 'Limited Edition',
        price: 199.99,
        image: 'images/products/shoe5.jpg'
    },
    {
        id: 4,
        name: 'Sporty Sneakers',
        price: 99.99,
        image: 'images/products/shoe4.jpg'
    }
];

// Initialize product page
function initProductPage() {
    // Set product info
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('productDescription').textContent = product.description;
    
    // Set main image
    mainImage.src = product.images[0];
    
    // Set thumbnails
    thumbnails.forEach((thumb, index) => {
        if (index < product.images.length) {
            thumb.src = product.images[index];
        } else {
            thumb.style.display = 'none';
        }
    });
    
    // Load related products
    displayRelatedProducts();
}

// Display related products
function displayRelatedProducts() {
    const relatedGrid = document.querySelector('.related-products .products-grid');
    relatedGrid.innerHTML = '';
    
    relatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <a href="product-detail.html?id=${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </a>
        `;
        relatedGrid.appendChild(productCard);
    });
}

// Thumbnail click event
thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        // Remove active class from all thumbnails
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        // Add active class to clicked thumbnail
        thumbnail.classList.add('active');
        // Change main image
        mainImage.src = thumbnail.src;
    });
});

// Size selection
sizeOptions.forEach(option => {
    option.addEventListener('click', () => {
        sizeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
    });
});

// Quantity control
minusBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    if (value > 1) {
        quantityInput.value = value - 1;
    }
});

plusBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    quantityInput.value = value + 1;
});

// Add to cart
addToCartBtn.addEventListener('click', () => {
    const selectedSize = document.querySelector('.size-option.active').textContent;
    const quantity = parseInt(quantityInput.value);
    
    // Get cart from localStorage or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product with same ID and size already in cart
    const existingItemIndex = cart.findIndex(item => 
        item.id === product.id && item.size === selectedSize
    );
    
    if (existingItemIndex !== -1) {
        // Update quantity if item already in cart
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            size: selectedSize,
            quantity: quantity
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show success message
    showNotification(`${product.name} (Size: ${selectedSize}) added to cart!`);
});

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = totalItems;
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Tab switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        tabBtns.forEach(button => button.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initProductPage();
    updateCartCount();
    
    // Add notification styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #333;
            color: white;
            padding: 15px 25px;
            border-radius: 4px;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1000;
        }
        .notification.show {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
});