// Sample product data for women's shoes
const womenProducts = [
    {
        id: 'w1',
        name: 'Classic White Sneakers',
        price: 89.99,
        image: 'images/women1.jpg',
        description: 'Comfortable white sneakers perfect for everyday wear.'
    },
    {
        id: 'w2',
        name: 'Elegant Black Heels',
        price: 129.99,
        image: 'images/women2.jpg',
        description: 'Stylish black heels for formal occasions.'
    },
    {
        id: 'w3',
        name: 'Running Shoes',
        price: 79.99,
        image: 'images/women3.jpg',
        description: 'Lightweight running shoes with great support.'
    },
    {
        id: 'w4',
        name: 'Casual Sandals',
        price: 49.99,
        image: 'images/women4.jpg',
        description: 'Comfortable sandals for summer days.'
    },
    {
        id: 'w5',
        name: 'Winter Boots',
        price: 99.99,
        image: 'images/women5.jpg',
        description: 'Warm and waterproof boots for cold weather.'
    },
    {
        id: 'w6',
        name: 'Ballet Flats',
        price: 59.99,
        image: 'images/women6.jpg',
        description: 'Elegant and comfortable flats for any occasion.'
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display products
function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';
    
    womenProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p>${product.description}</p>
                <button onclick="addToCart('${product.id}', '${product.name}', ${product.price})" class="add-to-cart">Add to Cart</button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    updateCartCount();
}

// Add to cart function
function addToCart(productId, productName, productPrice) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} added to cart!`);
}

// Update cart count display
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
}

// View cart function
function viewCart() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        let cartContent = 'Your Cart:\n\n';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            cartContent += `${item.name} x${item.quantity} - $${itemTotal.toFixed(2)}\n`;
            total += itemTotal;
        });
        
        cartContent += `\nTotal: $${total.toFixed(2)}`;
        alert(cartContent);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', displayProducts);