// Men's products data
const menProducts = [
    {
        id: 'm1',
        name: 'Classic Leather Oxfords',
        price: 149.99,
        image: './asset/m1.avif', // Changed from './asset' to './assets'
        category: 'Dress Shoes',
        colors: ['Black', 'Brown'],
        sizes: [8, 9, 10, 11],
        description: 'Premium leather oxford shoes for formal occasions.'
    },
    {
        id: 'm2',
        name: 'Running Shoes',
        price: 99.99,
        image: './asset/m2.avif',
        category: 'Sneakers',
        colors: ['Black', 'White', 'Blue'],
        sizes: [8, 9, 10, 11, 12],
        description: 'High-performance running shoes with responsive cushioning.'
    },
    {
        id: 'm3',
        name: 'Casual Sneakers',
        price: 79.99,
        image: './asset/m3.avif',
        category: 'Sneakers',
        colors: ['White', 'Gray'],
        sizes: [8, 9, 10, 11],
        description: 'Minimalist sneakers for everyday comfort.'
    },
    {
        id: 'm4',
        name: 'Leather Loafers',
        price: 119.99,
        image: './asset/m4.avif',
        category: 'Dress Shoes',
        colors: ['Brown', 'Black'],
        sizes: [9, 10, 11],
        description: 'Sophisticated leather loafers for business casual.'
    },
    {
        id: 'm5',
        name: 'Hiking Boots',
        price: 159.99,
        image: './asset/m5.avif',
        category: 'Boots',
        colors: ['Brown', 'Black'],
        sizes: [8, 9, 10, 11, 12],
        description: 'Durable hiking boots with waterproof membrane.'
    },
    {
        id: 'm6',
        name: 'Canvas Slip-ons',
        price: 59.99,
        image: './asset/m6.avif',
        category: 'Sneakers',
        colors: ['Black', 'Blue', 'Gray'],
        sizes: [8, 9, 10],
        description: 'Lightweight slip-on shoes for casual wear.'
    },
    {
        id: 'm7',
        name: 'Chelsea Boots',
        price: 129.99,
        image: './asset/m7.avif',
        category: 'Boots',
        colors: ['Black', 'Brown'],
        sizes: [8, 9, 10, 11],
        description: 'Stylish Chelsea boots with elastic side panels.'
    },
    {
        id: 'm8',
        name: 'Athletic Sandals',
        price: 69.99,
        image: './asset/m8.avif',
        category: 'Sandals',
        colors: ['Black', 'Brown', 'Blue'],
        sizes: [8, 9, 10, 11],
        description: 'Comfortable sandals with adjustable straps.'
    },
    {
        id: 'm9',
        name: 'Athletic Sandals',
        price: 69.99,
        image: './asset/m9.avif',
        category: 'Sandals',
        colors: ['Black', 'Brown', 'Blue'],
        sizes: [8, 9, 10, 11],
        description: 'Comfortable sandals with adjustable straps.'
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display products
function displayProducts(products = menProducts) {
    const productsGrid = document.getElementById('menProducts');
    if (!productsGrid) {
        console.error('Products grid element not found');
        return;
    }
    
    productsGrid.innerHTML = '';
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<p class="no-products">No products found matching your criteria.</p>';
        return;
    }
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-description">${product.description}</p>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart('${product.id}', '${product.name.replace(/'/g, "\\'")}', ${product.price}, '${product.image.replace(/'/g, "\\'")}')">Add to Cart</button>
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
                    const filterName = group.getAttribute('data-filter-name') || group.querySelector('h4').textContent;
                    activeFilters[filterName] = activeOption.textContent.trim();
                }
            });
            
            // Apply filters
            applyFilters(activeFilters);
        });
    });
}

// Apply filters to products
function applyFilters(filters) {
    let filteredProducts = [...menProducts];
    
    for (const [filterName, filterValue] of Object.entries(filters)) {
        if (filterValue === 'All') continue;
        
        filteredProducts = filteredProducts.filter(product => {
            if (filterName === 'Category') {
                return product.category === filterValue;
            } else if (filterName === 'Price') {
                if (filterValue === 'Under $100') return product.price < 100;
                if (filterValue === '$100 - $150') return product.price >= 100 && product.price <= 150;
                if (filterValue === 'Over $150') return product.price > 150;
            } else if (filterName === 'Color') {
                return product.colors.includes(filterValue);
            }
            return true;
        });
    }
    
    displayProducts(filteredProducts);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    setupFilters();
});