// // DOM Elements
// const productsGrid = document.querySelector('.products-grid');
// const cartCount = document.querySelector('.cart-count');
// const hamburger = document.querySelector('.hamburger');
// const navLinks = document.querySelector('.nav-links');

// // Sample Product Data
// const products = [
//     {
//         id: 1,
//         name: 'Premium Runner',
//         price: 129.99,
//         category: 'men',
//         image: 'images/products/shoe1.jpg',
//         description: 'Lightweight running shoes with premium cushioning'
//     },
//     {
//         id: 2,
//         name: 'Classic Leather',
//         price: 159.99,
//         category: 'men',
//         image: 'images/products/shoe2.jpg',
//         description: 'Timeless leather shoes for every occasion'
//     },
//     {
//         id: 3,
//         name: 'Elegant Heels',
//         price: 179.99,
//         category: 'women',
//         image: 'images/products/shoe3.jpg',
//         description: 'Sophisticated heels for formal events'
//     },
//     {
//         id: 4,
//         name: 'Sporty Sneakers',
//         price: 99.99,
//         category: 'women',
//         image: 'images/products/shoe4.jpg',
//         description: 'Comfortable sneakers for everyday wear'
//     },
//     {
//         id: 5,
//         name: 'Limited Edition',
//         price: 199.99,
//         category: 'men',
//         image: 'images/products/shoe5.jpg',
//         description: 'Exclusive limited edition designer shoes'
//     },
//     {
//         id: 6,
//         name: 'Summer Sandals',
//         price: 79.99,
//         category: 'women',
//         image: 'images/products/shoe6.jpg',
//         description: 'Breathable sandals for warm weather'
//     }
// ];

// // Cart functionality
// let cart = JSON.parse(localStorage.getItem('cart')) || [];

// // Display featured products
// function displayFeaturedProducts() {
//     productsGrid.innerHTML = '';
//     products.forEach(product => {
//         const productCard = document.createElement('div');
//         productCard.className = 'product-card';
//         productCard.innerHTML = `
//             <a href="product-detail.html?id=${product.id}">
//                 <div class="product-image">
//                     <img src="${product.image}" alt="${product.name}">
//                 </div>
//                 <div class="product-info">
//                     <h3>${product.name}</h3>
//                     <p class="product-price">$${product.price.toFixed(2)}</p>
//                     <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
//                 </div>
//             </a>
//         `;
//         productsGrid.appendChild(productCard);
//     });

//     // Add event listeners to all add-to-cart buttons
//     document.querySelectorAll('.add-to-cart').forEach(button => {
//         button.addEventListener('click', (e) => {
//             e.preventDefault();
//             const productId = parseInt(button.getAttribute('data-id'));
//             addToCart(productId);
//         });
//     });
// }

// // Add to cart function
// function addToCart(productId) {
//     const product = products.find(p => p.id === productId);
//     if (!product) return;

//     const existingItem = cart.find(item => item.id === productId);
//     if (existingItem) {
//         existingItem.quantity += 1;
//     } else {
//         cart.push({
//             id: product.id,
//             name: product.name,
//             price: product.price,
//             image: product.image,
//             quantity: 1
//         });
//     }

//     updateCart();
//     showNotification(`${product.name} added to cart!`);
// }

// // Update cart count
// function updateCart() {
//     const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
//     cartCount.textContent = totalItems;
//     localStorage.setItem('cart', JSON.stringify(cart));
// }

// // Show notification
// function showNotification(message) {
//     const notification = document.createElement('div');
//     notification.className = 'notification';
//     notification.textContent = message;
//     document.body.appendChild(notification);
    
//     setTimeout(() => {
//         notification.classList.add('show');
//     }, 10);

//     setTimeout(() => {
//         notification.classList.remove('show');
//         setTimeout(() => {
//             document.body.removeChild(notification);
//         }, 300);
//     }, 3000);
// }

// // Hamburger menu toggle
// hamburger.addEventListener('click', () => {
//     navLinks.classList.toggle('active');
// });

// // Initialize the page
// document.addEventListener('DOMContentLoaded', () => {
//     displayFeaturedProducts();
//     updateCart();
    
//     // Add notification styles dynamically
//     const style = document.createElement('style');
//     style.textContent = `
//         .notification {
//             position: fixed;
//             bottom: 20px;
//             left: 50%;
//             transform: translateX(-50%);
//             background-color: #333;
//             color: white;
//             padding: 15px 25px;
//             border-radius: 4px;
//             opacity: 0;
//             transition: opacity 0.3s ease;
//             z-index: 1000;
//         }
//         .notification.show {
//             opacity: 1;
//         }
//     `;
//     document.head.appendChild(style);
// });

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const cartCount = document.querySelector('.cart-count');
const featuredProducts = document.getElementById('featuredProducts');
const newsletterForm = document.getElementById('newsletterForm');

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Cart Count (you would load this from localStorage)
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

function updateCartCount() {
    cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
}

// Sample Product Data
const products = [
    {
        id: 1,
        title: 'Premium Runner',
        price: 129.99,
        originalPrice: 159.99,
        image: './asset/m10.avif',
        rating: 4,
        category: 'men'
    },
    {
        id: 2,
        title: 'Elegance Walk',
        price: 99.99,
        originalPrice: 119.99,
        image: './asset/m1.avif',
        rating: 5,
        category: 'women'
    },
    {
        id: 3,
        title: 'Urban Hiker',
        price: 149.99,
        image: './asset/m3.avif',
        rating: 4,
        category: 'men'
    },
    {
        id: 3,
        title: 'Urban Hiker',
        price: 149.99,
        image: './asset/w11.avif',
        rating: 4,
        category: 'women'
    },
    {
        id: 3,
        title: 'Urban Hiker',
        price: 149.99,
        image: './asset/m6.avif',
        rating: 4,
        category: 'men'
    },
    {
        id: 3,
        title: 'Urban Hiker',
        price: 149.99,
        image: './asset/w2.avif',
        rating: 4,
        category: 'women'
    },
    {
        id: 3,
        title: 'Urban Hiker',
        price: 149.99,
        image: './asset/w1.avif',
        rating: 4,
        category: 'women'
    },
    {
        id: 4,
        title: 'Classic Loafers',
        price: 89.99,
        originalPrice: 109.99,
        image: './asset/w10.webp',
        rating: 3,
        category: 'women'
    }
];

// Display Featured Products
function displayFeaturedProducts() {
    featuredProducts.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-img">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">
                    $${product.price.toFixed(2)}
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-rating">
                    ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}
                </div>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');

    // Add event listeners to all add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to Cart Function
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            ...product,
            quantity: 1,
            size: 'M' // Default size
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification(`${product.title} added to cart!`);
}

// Show Notification
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

// Newsletter Form Submission
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        // Here you would typically send this to your server
        console.log('Subscribed email:', email);
        this.querySelector('input').value = '';
        showNotification('Thanks for subscribing!');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayFeaturedProducts();
    
    // Add notification styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--secondary-color);
            color: white;
            padding: 15px 30px;
            border-radius: 5px;
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
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".buy-btn");
  buttons.forEach(btn =>
    btn.addEventListener("click", () => alert("Thanks for your order!"))
  );
});
