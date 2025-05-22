// Men's products data
const menProducts = [
    {
        id: 'm1',
        name: 'Classic Leather Oxfords',
        price: 149.99,
        image: 'images/men/men1.jpg',
        category: 'Dress Shoes',
        colors: ['Black', 'Brown'],
        sizes: [8, 9, 10, 11],
        description: 'Premium leather oxford shoes for formal occasions.'
    },
    {
        id: 'm2',
        name: 'Running Shoes',
        price: 99.99,
        image: 'images/men/men2.jpg',
        category: 'Sneakers',
        colors: ['Black', 'White', 'Blue'],
        sizes: [8, 9, 10, 11, 12],
        description: 'High-performance running shoes with responsive cushioning.'
    },
    {
        id: 'm3',
        name: 'Casual Sneakers',
        price: 79.99,
        image: 'images/men/men3.jpg',
        category: 'Sneakers',
        colors: ['White', 'Gray'],
        sizes: [8, 9, 10, 11],
        description: 'Minimalist sneakers for everyday comfort.'
    },
    {
        id: 'm4',
        name: 'Leather Loafers',
        price: 119.99,
        image: 'images/men/men4.jpg',
        category: 'Dress Shoes',
        colors: ['Brown', 'Black'],
        sizes: [9, 10, 11],
        description: 'Sophisticated leather loafers for business casual.'
    },
    {
        id: 'm5',
        name: 'Hiking Boots',
        price: 159.99,
        image: 'images/men/men5.jpg',
        category: 'Boots',
        colors: ['Brown', 'Black'],
        sizes: [8, 9, 10, 11, 12],
        description: 'Durable hiking boots with waterproof membrane.'
    },
    {
        id: 'm6',
        name: 'Canvas Slip-ons',
        price: 59.99,
        image: 'images/men/men6.jpg',
        category: 'Sneakers',
        colors: ['Black', 'Blue', 'Gray'],
        sizes: [8, 9, 10],
        description: 'Lightweight slip-on shoes for casual wear.'
    },
    {
        id: 'm7',
        name: 'Chelsea Boots',
        price: 129.99,
        image: 'images/men/men7.jpg',
        category: 'Boots',
        colors: ['Black', 'Brown'],
        sizes: [8, 9, 10, 11],
        description: 'Stylish Chelsea boots with elastic side panels.'
    },
    {
        id: 'm8',
        name: 'Athletic Sandals',
        price: 69.99,
        image: 'images/men/men8.jpg',
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
function applyFilters(f