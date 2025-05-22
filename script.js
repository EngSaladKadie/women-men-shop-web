
    
        // ===== DOM Elements =====
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const cartCount = document.querySelector('.cart-count');
        const featuredProducts = document.getElementById('featuredProducts');
        const newsletterForm = document.getElementById('newsletterForm');
        const productModal = document.getElementById('productModal');
        const closeModal = document.querySelector('.close-modal');
        const modalMainImage = document.getElementById('modalMainImage');
        const thumbnailContainer = document.getElementById('thumbnailContainer');
        const modalProductTitle = document.getElementById('modalProductTitle');
        const modalProductPrice = document.getElementById('modalProductPrice');
        const modalProductRating = document.getElementById('modalProductRating');
        const modalProductDescription = document.getElementById('modalProductDescription');
        const sizeOptions = document.getElementById('sizeOptions');
        const quantityInput = document.querySelector('.quantity-input');
        const minusBtn = document.querySelector('.quantity-btn.minus');
        const plusBtn = document.querySelector('.quantity-btn.plus');
        const addToCartBtn = document.querySelector('.modal-actions .add-to-cart');
        const wishlistBtn = document.querySelector('.wishlist-btn');

        // ===== Product Data =====
        const products = [
            {
                id: 1,
                title: 'Premium Runner',
                price: 129.99,
                originalPrice: 159.99,
                images: [
                    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                ],
                rating: 4,
                category: 'men',
                description: 'Lightweight running shoes with premium cushioning technology for maximum comfort during your workouts. Features breathable mesh upper and durable rubber outsole.',
                sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12']
            },
            {
                id: 2,
                title: 'Classic Leather',
                price: 159.99,
                images: [
                    'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                ],
                rating: 5,
                category: 'men',
                description: 'Timeless leather shoes crafted from premium full-grain leather. Perfect for both formal occasions and casual wear. Features cushioned insole for all-day comfort.',
                sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11']
            },
            {
                id: 3,
                title: 'Elegant Heels',
                price: 179.99,
                originalPrice: 199.99,
                images: [
                    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                ],
                rating: 4,
                category: 'women',
                description: 'Sophisticated high heels with a comfortable 3-inch heel. Features a sleek pointed toe and premium leather construction. Perfect for formal events and evenings out.',
                sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9']
            },
            {
                id: 4,
                title: 'Sporty Sneakers',
                price: 99.99,
                images: [
                    'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                    'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                ],
                rating: 3,
                category: 'women',
                description: 'Comfortable sneakers for everyday wear with cushioned soles and breathable fabric. Available in multiple colors to match any outfit.',
                sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9', 'US 10']
            },
             {
                id: 3,
                title: 'Elegant Heels',
                price: 179.99,
                originalPrice: 199.99,
                images: [
                   './asset/w1.avif',
                   './asset/w10.webp',
                   './asset/m2.avif'

                ],
                rating: 4,
                category: 'women',
                description: 'Sophisticated high heels with a comfortable 3-inch heel. Features a sleek pointed toe and premium leather construction. Perfect for formal events and evenings out.',
                sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9']
            },

        ];

        // ===== Cart Data =====
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let currentProduct = null;

        // ===== Initialize Page =====
        document.addEventListener('DOMContentLoaded', () => {
            displayFeaturedProducts();
            updateCartCount();
            
            // Mobile menu toggle
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
            
            // Newsletter form submission
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
            
            // Modal close button
            closeModal.addEventListener('click', () => {
                productModal.style.display = 'none';
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === productModal) {
                    productModal.style.display = 'none';
                }
            });
            
            // Quantity buttons
            minusBtn.addEventListener('click', () => {
                if (quantityInput.value > 1) {
                    quantityInput.value--;
                }
            });
            
            plusBtn.addEventListener('click', () => {
                quantityInput.value++;
            });
            
            // Add to cart button
            addToCartBtn.addEventListener('click', addToCartFromModal);
            
            // Wishlist button
            wishlistBtn.addEventListener('click', toggleWishlist);
        });

        // ===== Display Featured Products =====
        function displayFeaturedProducts() {
            featuredProducts.innerHTML = products.map(product => `
                <div class="product-card" data-id="${product.id}">
                    <div class="product-img">
                        <img src="${product.images[0]}" alt="${product.title}">
                        <span class="quick-view">Quick View</span>
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
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            `).join('');
            
            // Add event listeners to product cards
            document.querySelectorAll('.product-card').forEach(card => {
                // Quick view on image click
                card.querySelector('.product-img').addEventListener('click', () => {
                    const productId = parseInt(card.getAttribute('data-id'));
                    openProductModal(productId);
                });
                
                // Add to cart button
                card.querySelector('.add-to-cart').addEventListener('click', (e) => {
                    e.stopPropagation();
                    const productId = parseInt(card.getAttribute('data-id'));
                    addToCart(productId);
                });
            });
        }

        // ===== Open Product Modal =====
        function openProductModal(productId) {
            currentProduct = products.find(p => p.id === productId);
            if (!currentProduct) return;
            
            // Set modal content
            modalProductTitle.textContent = currentProduct.title;
            modalProductPrice.innerHTML = `$${currentProduct.price.toFixed(2)}`;
            modalProductRating.innerHTML = `${'★'.repeat(currentProduct.rating)}${'☆'.repeat(5 - currentProduct.rating)}`;
            modalProductDescription.textContent = currentProduct.description;
            
            // Set main image
            modalMainImage.src = currentProduct.images[0];
            modalMainImage.alt = currentProduct.title;
            
            // Create thumbnails
            thumbnailContainer.innerHTML = currentProduct.images.map((image, index) => `
                <div class="thumbnail ${index === 0 ? 'active' : ''}">
                    <img src="${image}" alt="${currentProduct.title}">
                </div>
            `).join('');
            
            // Add event listeners to thumbnails
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.addEventListener('click', () => {
                    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                    modalMainImage.src = thumb.querySelector('img').src;
                });
            });
            
            // Create size options
            sizeOptions.innerHTML = currentProduct.sizes.map(size => `
                <div class="size-option">${size}</div>
            `).join('');
            
            // Add event listeners to size options
            document.querySelectorAll('.size-option').forEach(option => {
                option.addEventListener('click', () => {
                    document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                });
            });
            
            // Reset quantity
            quantityInput.value = 1;
            
            // Show modal
            productModal.style.display = 'block';
        }

        // ===== Cart Functions =====
        function addToCart(productId, quantity = 1, size = 'M') {
            const product = products.find(p => p.id === productId);
            if (!product) return;
            
            // Check if product is already in cart
            const existingItem = cart.find(item => item.id === productId && item.size === size);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.images[0],
                    quantity: quantity,
                    size: size
                });
            }
            
            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart count
            updateCartCount();
            
            // Show notification
            showNotification(`${product.title} added to cart!`);
        }

      