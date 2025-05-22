// DOM Elements
const cartItemsContainer = document.querySelector('.cart-items');
const emptyCartDiv = document.querySelector('.empty-cart');
const subtotalElement = document.querySelector('.subtotal');
const shippingElement = document.querySelector('.shipping');
const taxElement = document.querySelector('.tax');
const totalElement = document.querySelector('.total-amount');
const checkoutBtn = document.querySelector('.checkout-btn');

// Initialize cart page
function initCartPage() {
    displayCartItems();
    updateCartSummary();
    updateCartCount();
}

// Display cart items
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        emptyCartDiv.style.display = 'block';
        checkoutBtn.disabled = true;
        return;
    }
    
    emptyCartDiv.style.display = 'none';
    checkoutBtn.disabled = false;
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Size: ${item.size || 'N/A'}</p>
                <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus" data-index="${index}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-index="${index}">+</button>
            </div>
            <button class="remove-item" data-index="${index}">
                <i class="fas fa-times"></i>
            </button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            updateQuantity(index, -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            updateQuantity(index, 1);
        });
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            removeItem(index);
        });
    });
}

// Update item quantity
function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (index >= 0 && index < cart.length) {
        cart[index].quantity += change;
        
        // Remove item if quantity reaches 0
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartSummary();
        updateCartCount();
    }
}

// Remove item from cart
// Remove item from cart
function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        updateCartSummary();
        updateCartCount();
        
        // Show notification
        showNotification('Item removed from cart');
    }
}

// Update cart summary
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 9.99) : 0;
    const tax = subtotal * 0.08; // Assuming 8% tax rate
    
    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    shippingElement.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${(subtotal + shipping + tax).toFixed(2)}`;
}

// Update cart count in navbar
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

// Proceed to checkout
checkoutBtn.addEventListener('click', () => {
    // In a real application, this would redirect to a checkout page
    alert('Proceeding to checkout!');
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initCartPage();
    
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
        
        /* Cart specific styles */
        .cart-section {
            padding: 80px 0;
        }
        
        .cart-content {
            display: flex;
            gap: 30px;
            margin-top: 30px;
        }
        
        .cart-items {
            flex: 2;
        }
        
        .cart-summary {
            flex: 1;
            background: #fff;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            height: fit-content;
        }
        
        .cart-summary h2 {
            margin-bottom: 20px;
            font-size: 1.5rem;
        }
        
        .summary-details {
            margin-bottom: 25px;
        }
        
        .summary-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #eee;
        }
        
        .summary-row.total {
            font-weight: bold;
            font-size: 1.1rem;
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        .checkout-btn {
            width: 100%;
            padding: 15px;
            font-size: 1rem;
        }
        
        .cart-item {
            display: flex;
            align-items: center;
            background: #fff;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .cart-item-image {
            width: 120px;
            height: 120px;
            margin-right: 20px;
        }
        
        .cart-item-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
        }
        
        .cart-item-details {
            flex: 1;
        }
        
        .cart-item-details h3 {
            margin-bottom: 10px;
        }
        
        .cart-item-price {
            font-weight: bold;
            color: #ff6b6b;
            margin-top: 10px;
        }
        
        .cart-item-quantity {
            display: flex;
            align-items: center;
            margin: 0 30px;
        }
        
        .cart-item-quantity .quantity {
            margin: 0 15px;
            font-weight: bold;
        }
        
        .quantity-btn {
            width: 30px;
            height: 30px;
            border: 1px solid #ddd;
            background: none;
            font-size: 1rem;
            cursor: pointer;
            border-radius: 4px;
        }
        
        .quantity-btn:hover {
            background: #f5f5f5;
        }
        
        .remove-item {
            background: none;
            border: none;
            font-size: 1.2rem;
            color: #999;
            cursor: pointer;
            padding: 5px;
        }
        
        .remove-item:hover {
            color: #ff6b6b;
        }
        
        .empty-cart {
            text-align: center;
            padding: 50px 0;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .empty-cart i {
            font-size: 3rem;
            color: #ddd;
            margin-bottom: 20px;
        }
        
        .empty-cart h2 {
            margin-bottom: 10px;
        }
        
        .empty-cart p {
            margin-bottom: 30px;
            color: #777;
        }
        
        @media (max-width: 768px) {
            .cart-content {
                flex-direction: column;
            }
            
            .cart-item {
                flex-direction: column;
                text-align: center;
            }
            
            .cart-item-image {
                margin-right: 0;
                margin-bottom: 15px;
            }
            
            .cart-item-quantity {
                margin: 15px 0;
            }
        }
    `;
    document.head.appendChild(style);
});