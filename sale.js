document.addEventListener('DOMContentLoaded', function() {
    // Sample sale products data (in a real app, this would come from an API)
    const saleProducts = [
        {
            id: 101,
            title: 'Summer Sneakers',
            price: 59.99,
            originalPrice: 99.99,
            discount: 40,
            image: 'images/sale/shoe-sale1.jpg',
            rating: 4,
            category: 'men',
            featured: true
        },
        {
            id: 102,
            title: 'Casual Loafers',
            price: 49.99,
            originalPrice: 79.99,
            discount: 38,
            image: 'images/sale/shoe-sale2.jpg',
            rating: 3,
            category: 'men',
            featured: false
        },
        {
            id: 103,
            title: 'Elegant Pumps',
            price: 69.99,
            originalPrice: 129.99,
            discount: 46,
            image: 'images/sale/shoe-sale3.jpg',
            rating: 5,
            category: 'women',
            featured: true
        },
        {
            id: 104,
            title: 'Sporty Sandals',
            price: 39.99,
            originalPrice: 59.99,
            discount: 33,
            image: 'images/sale/shoe-sale4.jpg',
            rating: 4,
            category: 'women',
            featured: false
        },
        {
            id: 105,
            title: 'Classic Oxfords',
            price: 79.99,
            originalPrice: 149.99,
            discount: 47,
            image: 'images/sale/shoe-sale5.jpg',
            rating: 4,
            category: 'men',
            featured: true
        },
        {
            id: 106,
            title: 'Fashion Boots',
            price: 89.99,
            originalPrice: 159.99,
            discount: 44,
            image: 'images/sale/shoe-sale6.jpg',
            rating: 5,
            category: 'women',
            featured: true
        },
        {
            id: 107,
            title: 'Running Shoes',
            price: 64.99,
            originalPrice: 89.99,
            discount: 28,
            image: 'images/sale/shoe-sale7.jpg',
            rating: 4,
            category: 'men',
            featured: false
        },
        {
            id: 108,
            title: 'Comfy Flats',
            price: 44.99,
            originalPrice: 69.99,
            discount: 36,
            image: 'images/sale/shoe-sale8.jpg',
            rating: 3,
            category: 'women',
            featured: false
        }
    ];

    // DOM Elements
    const saleProductsContainer = document.getElementById('saleProducts');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortBy = document.getElementById('sortBy');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const pageNumbers = document.getElementById('pageNumbers');
    const saleNewsletterForm = document.getElementById('saleNewsletterForm');

    // Pagination variables
    let currentPage = 1;
    const productsPerPage = 8;
    let filteredProducts = [...saleProducts];

    // Countdown Timer
    function updateCountdown() {
        const now = new Date();
        const endOfSale = new Date();
        endOfSale.setDate(now.getDate() + 7); // Sale ends in 7 days
        
        const diff = endOfSale - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Display Sale Products
    function displaySaleProducts(products) {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const paginatedProducts = products.slice(startIndex, endIndex);
        
        if (paginatedProducts.length === 0) {
            saleProductsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters</p>
                </div>
            `;
            return;
        }
        
        saleProductsContainer.innerHTML = paginatedProducts.map(product => `
            <div class="product-card sale-product">
                <div class="sale-badge">${product.discount}% OFF</div>
                <div class="product-img">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        $${product.price.toFixed(2)}
                        <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                    </div>
                    <div class="product-rating">
                        ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `).join('');
        
        // Update pagination
        const totalPages = Math.ceil(products.length / productsPerPage);
        pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;
        
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
        
        // Add event listeners to add to cart buttons
        document.querySelectorAll('#saleProducts .add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }

    // Filter and Sort Products
    function filterAndSortProducts() {
        const category = categoryFilter.value;
        const sortOption = sortBy.value;
        
        // Filter by category
        filteredProducts = category === 'all' 
            ? [...saleProducts] 
            : saleProducts.filter(product => product.category === category);
        
        // Sort products
        switch(sortOption) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'discount':
                filteredProducts.sort((a, b) => b.discount - a.discount);
                break;
            case 'featured':
            default:
                filteredProducts.sort((a, b) => b.featured - a.featured);
                break;
        }
        
        currentPage = 1; // Reset to first page when filters change
        displaySaleProducts(filteredProducts);
    }

    // Pagination Controls
    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            displaySaleProducts(filteredProducts);
        }
    });
    
    nextPageBtn.addEventListener('click', function() {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displaySaleProducts(filteredProducts);
        }
    });

    // Filter and Sort Event Listeners
    categoryFilter.addEventListener('change', filterAndSortProducts);
    sortBy.addEventListener('change', filterAndSortProducts);

    // Newsletter Form
    if (saleNewsletterForm) {
        saleNewsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            // Here you would typically send this to your server
            console.log('Sale subscriber:', email);
            this.querySelector('input').value = '';
            showNotification('Thanks for subscribing to our sale alerts!');
        });
    }

    // Initialize
    filterAndSortProducts();
});