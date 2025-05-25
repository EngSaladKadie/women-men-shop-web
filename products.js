document.addEventListener('DOMContentLoaded', function() {
    // Sample product data
    const products = [
        {
            id: 1,
            name: "Running Pro 2023",
            sku: "RUN-001",
            category: "running",
            brand: "Nike",
            price: 129.99,
            cost: 75.50,
            sizes: "7,8,9,10,11",
            colors: "Black,White,Red",
            stock: 45,
            image: "./asset/w11.avif"
        },
        {
            id: 2,
            name: "Casual Walk",
            sku: "CSL-001",
            category: "casual",
            brand: "Adidas",
            price: 89.99,
            cost: 55.00,
            sizes: "6,7,8,9,10",
            colors: "Blue,Black",
            stock: 12,
            image: "./asset/m4.avif"
        },
        {
            id: 3,
            name: "Basketball Elite",
            sku: "BSK-001",
            category: "basketball",
            brand: "Jordan",
            price: 159.99,
            cost: 90.00,
            sizes: "8,9,10,11,12",
            colors: "Red,Black,White",
            stock: 8,
            image: "./asset/m1.avif"
        },
        {
            id: 4,
            name: "Soccer Pro",
            sku: "SOC-001",
            category: "soccer",
            brand: "Puma",
            price: 109.99,
            cost: 65.00,
            sizes: "7,8,9,10",
            colors: "Black,White,Blue",
            stock: 22,
            image: "./asset/m3.avif"
        },
        {
            id: 5,
            name: "Trail Runner",
            sku: "RUN-002",
            category: "running",
            brand: "New Balance",
            price: 119.99,
            cost: 70.00,
            sizes: "7,8,9,10,11",
            colors: "Green,Black",
            stock: 5,
            image: "./asset/w5.avif"
        }
    ];

    // DOM elements
    const productsTableBody = document.getElementById('products-table-body');
    const addProductBtn = document.getElementById('add-product-btn');
    const productForm = document.getElementById('product-form');
    const modal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const categoryFilter = document.getElementById('category-filter');
    const sizeFilter = document.getElementById('size-filter');
    const statusFilter = document.getElementById('status-filter');
    const searchInput = document.getElementById('search-products');
    
    // Pagination elements
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    
    // Pagination variables
    let currentPage = 1;
    const productsPerPage = 10;
    
    // Display products in table
    function displayProducts(productsToDisplay) {
        productsTableBody.innerHTML = '';
        
        if (productsToDisplay.length === 0) {
            productsTableBody.innerHTML = '<tr><td colspan="11" class="no-products">No products found</td></tr>';
            return;
        }
        
        productsToDisplay.forEach(product => {
            const profit = product.price - product.cost;
            let statusClass = 'in-stock';
            let statusText = 'In Stock';
            
            if (product.stock === 0) {
                statusClass = 'out-of-stock';
                statusText = 'Out of Stock';
            } else if (product.stock < 10) {
                statusClass = 'low-stock';
                statusText = 'Low Stock';
            }
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${product.image}" alt="${product.name}" class="product-image"></td>
                <td>${product.name}</td>
                <td>${product.sku}</td>
                <td>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</td>
                <td>${product.sizes}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>$${product.cost.toFixed(2)}</td>
                <td>$${profit.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td><span class="stock-status ${statusClass}">${statusText}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn edit" data-id="${product.id}"><i class="fas fa-edit"></i></button>
                        <button class="btn delete" data-id="${product.id}"><i class="fas fa-trash"></i></button>
                    </div>
                </td>
            `;
            productsTableBody.appendChild(row);
        });
        
        // Add event listeners to edit and delete buttons
        document.querySelectorAll('.btn.edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                editProduct(productId);
            });
        });
        
        document.querySelectorAll('.btn.delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                deleteProduct(productId);
            });
        });
    }
    
    // Filter products based on filters and search
    function filterProducts() {
        const category = categoryFilter.value;
        const size = sizeFilter.value;
        const status = statusFilter.value;
        const searchTerm = searchInput.value.toLowerCase();
        
        let filteredProducts = products.filter(product => {
            // Category filter
            if (category !== 'all' && product.category !== category) {
                return false;
            }
            
            // Size filter
            if (size !== 'all' && !product.sizes.split(',').includes(size)) {
                return false;
            }
            
            // Status filter
            if (status !== 'all') {
                if (status === 'in-stock' && product.stock < 10) {
                    return false;
                }
                if (status === 'low-stock' && (product.stock >= 10 || product.stock === 0)) {
                    return false;
                }
                if (status === 'out-of-stock' && product.stock > 0) {
                    return false;
                }
            }
            
            // Search filter
            // if (searchTerm && !(
            //     product.name.toLowerCase().includes(searchTerm) ||
            //     product.sku.toLowerCase().includes(searchTerm) ||
            //     product.brand.toLowerCase().includes(searchTerm)
            // ) 
            // {
            //    return false;
            // }
                
            
            
            return true;
        });
        
        // Update pagination
        updatePagination(filteredProducts);
        
        // Get products for current page
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const productsToDisplay = filteredProducts.slice(startIndex, endIndex);
        
        displayProducts(productsToDisplay);
    }
    
    // Update pagination controls
    function updatePagination(filteredProducts) {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
        
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }
    
    // Add new product
    function addProduct() {
        modalTitle.textContent = 'Add New Product';
        productForm.reset();
        document.getElementById('image-preview').innerHTML = '';
        modal.style.display = 'flex';
    }
    
    // Edit product
    function editProduct(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;
        
        modalTitle.textContent = 'Edit Product';
        
        // Fill form with product data
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-sku').value = product.sku;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-cost').value = product.cost;
        document.getElementById('product-profit').value = (product.price - product.cost).toFixed(2);
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-brand').value = product.brand;
        document.getElementById('product-colors').value = product.colors;
        document.getElementById('product-sizes').value = product.sizes;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-description').value = product.description || '';
        
        // Set image preview
        const preview = document.getElementById('image-preview');
        preview.innerHTML = '';
        
        if (product.image) {
            const previewItem = document.createElement('div');
            previewItem.className = 'image-preview-item';
            
            const img = document.createElement('img');
            img.src = product.image;
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-image';
            removeBtn.innerHTML = '&times;';
            removeBtn.addEventListener('click', function() {
                previewItem.remove();
            });
            
            previewItem.appendChild(img);
            previewItem.appendChild(removeBtn);
            preview.appendChild(previewItem);
        }
        
        modal.style.display = 'flex';
    }
    
    // Delete product
    function deleteProduct(productId) {
        if (confirm('Are you sure you want to delete this product?')) {
            const index = products.findIndex(p => p.id === productId);
            if (index !== -1) {
                products.splice(index, 1);
                filterProducts();
                alert('Product deleted successfully');
            }
        }
    }
    
    // Save product (add or update)
    productForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('product-name').value;
        const sku = document.getElementById('product-sku').value;
        const price = parseFloat(document.getElementById('product-price').value);
        const cost = parseFloat(document.getElementById('product-cost').value);
        const category = document.getElementById('product-category').value;
        const brand = document.getElementById('product-brand').value;
        const colors = document.getElementById('product-colors').value;
        const sizes = document.getElementById('product-sizes').value;
        const stock = parseInt(document.getElementById('product-stock').value);
        const description = document.getElementById('product-description').value;
        
        // In a real app, you would upload the images to a server
        const image = document.querySelector('#image-preview img')?.src || 'https://via.placeholder.com/150?text=No+Image';
        
        if (modalTitle.textContent === 'Add New Product') {
            // Add new product
            const newProduct = {
                id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
                name,
                sku,
                category,
                brand,
                price,
                cost,
                sizes,
                colors,
                stock,
                description,
                image
            };
            
            products.push(newProduct);
            alert('Product added successfully');
        } else {
            // Edit existing product
            // In a real app, you would find the product by ID and update it
            alert('Product updated successfully');
        }
        
        modal.style.display = 'none';
        filterProducts();
    });
    
    // Event listeners
    addProductBtn.addEventListener('click', addProduct);
    
    categoryFilter.addEventListener('change', filterProducts);
    sizeFilter.addEventListener('change', filterProducts);
    statusFilter.addEventListener('change', filterProducts);
    searchInput.addEventListener('input', filterProducts);
    
    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            filterProducts();
        }
    });
})