// Women's products data
const womenProducts = [
    {
        id: 'w1',
        name: 'Elegant Stiletto Heels',
        price: 129.99,
        image: './asset/w1.avif',
        category: 'Heels',
        colors: ['Black', 'Red'],
        sizes: [6, 7, 8],
        description: 'Classic black stiletto heels perfect for evening wear.'
    },
    {
        id: 'w2',
        name: 'White Platform Sneakers',
        price: 89.99,
        image: './asset/w2.avif',
        category: 'Sneakers',
        colors: ['White'],
        sizes: [5, 6, 7, 8],
        description: 'Comfortable white platform sneakers with chunky soles.'
    },
    {
        id: 'w3',
        name: 'Ankle Boots',
        price: 109.99,
        image: './asset/w3.avif',
        category: 'Boots',
        colors: ['Black', 'Brown'],
        sizes: [6, 7, 8, 9],
        description: 'Stylish ankle boots for autumn and winter seasons.'
    },
    {
        id: 'w4',
        name: 'Strappy Sandals',
        price: 79.99,
        image: './asset/w4.avif',
        category: 'Sandals',
        colors: ['Black', 'Gold'],
        sizes: [5, 6, 7],
        description: 'Elegant strappy sandals for summer occasions.'
    },
    {
        id: 'w5',
        name: 'Running Shoes',
        price: 99.99,
        image: './asset/w5.avif',
        category: 'Sneakers',
        colors: ['White', 'Pink', 'Blue'],
        sizes: [6, 7, 8, 9],
        description: 'High-performance running shoes with cushioning.'
    },
    {
        id: 'w6',
        name: 'Leather Loafers',
        price: 94.99,
        image: './asset/w6.avif',
        category: 'Loafers',
        colors: ['Black', 'Brown'],
        sizes: [6, 7, 8],
        description: 'Premium leather loafers for a sophisticated look.'
    },
    {
        id: 'w7',
        name: 'Combat Boots',
        price: 119.99,
        image: './asset/w7.avif',
        category: 'Boots',
        colors: ['Black'],
        sizes: [6, 7, 8, 9],
        description: 'Edgy combat boots with lace-up design.'
    },
    {
        id: 'w8',
        name: 'Ballet Flats',
        price: 69.99,
        image: './asset/w8.avif',
        category: 'Flats',
        colors: ['Black', 'Nude', 'Red'],
        sizes: [5, 6, 7, 8],
        description: 'Classic ballet flats for everyday comfort.'
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display products
function displayProducts(products = womenProducts) {
    const productsGrid = document.getElementById('womenProducts');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
                    <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    updateCartCount();
}

// Add to cart function
function addToCart(productId, productName, productPrice, productImage) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${productName} added to cart!`);
}

// Update cart count display
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
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

// Filter functionality
function setupFilters() {
    const filterOptions = document.querySelectorAll('.filter-option');
    
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options in this group
            this.parentElement.querySelectorAll('.filter-option').forEach(opt => {
                opt.classList.remove('active');
            });
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Get all active filters
            const activeFilters = {};
            document.querySelectorAll('.filter-group').forEach(group => {
                const activeOption = group.querySelector('.filter-option.active');
                if (activeOption) {
                    const filterName = group.querySelector('h4').textContent;
                    activeFilters[filterName] = activeOption.textContent;
                }
            });
            
            // Apply filters
            applyFilters(activeFilters);
        });
    });
}

// Apply filters to products
function applyFilters(filters) {
    let filteredProducts = [...womenProducts];
    
    if (filters['Category'] && filters['Category'] !== 'All') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === filters['Category']
        );
    }
    
    if (filters['Size']) {
        filteredProducts = filteredProducts.filter(product => 
            product.sizes.includes(Number(filters['Size']))
        );
    }
    
    if (filters['Color']) {
        filteredProducts = filteredProducts.filter(product => 
            product.colors.includes(filters['Color'])
        );
    }
    
    displayProducts(filteredProducts);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    setupFilters();
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
});