document.addEventListener('DOMContentLoaded', function() {
    // Sample inventory data (in a real app, this would come from an API)
    let inventoryData = [
        {
            id: 1,
            productId: 101,
            productName: "Air Runner Pro",
            sku: "RUN-ARP-BL-10",
            category: "running",
            size: "10",
            color: "Black",
            quantity: 15,
            threshold: 5,
            price: 129.99,
            location: "A1-B2",
            status: "in-stock",
            lastUpdated: "2023-05-15"
        },
        {
            id: 2,
            productId: 102,
            productName: "Casual Comfort Walkers",
            sku: "CAS-CCW-WH-8",
            category: "casual",
            size: "8",
            color: "White",
            quantity: 3,
            threshold: 5,
            price: 89.99,
            location: "B3-C1",
            status: "low-stock",
            lastUpdated: "2023-05-18"
        },
        {
            id: 3,
            productId: 103,
            productName: "Bounce Basketball Elite",
            sku: "BBL-BBE-RD-11",
            category: "basketball",
            size: "11",
            color: "Red",
            quantity: 0,
            threshold: 3,
            price: 149.99,
            location: "C2-D3",
            status: "out-of-stock",
            lastUpdated: "2023-05-10"
        },
        {
            id: 4,
            productId: 104,
            productName: "Sprint Soccer Cleats",
            sku: "SOC-SSC-BL-9",
            category: "soccer",
            size: "9",
            color: "Blue",
            quantity: 7,
            threshold: 5,
            price: 119.99,
            location: "D4-A2",
            status: "in-stock",
            lastUpdated: "2023-05-20"
        },
        {
            id: 5,
            productId: 105,
            productName: "Trail Hiker Pro",
            sku: "OUT-THP-GN-10",
            category: "outdoor",
            size: "10",
            color: "Green",
            quantity: 12,
            threshold: 5,
            price: 139.99,
            location: "E1-F3",
            status: "in-stock",
            lastUpdated: "2023-05-12"
        }
    ];

    // DOM Elements
    const inventoryTable = document.getElementById('inventory-table');
    const inventoryList = document.getElementById('inventory-list');
    const inventoryModal = document.getElementById('inventory-modal');
    const confirmModal = document.getElementById('confirm-modal');
    const inventoryForm = document.getElementById('inventory-form');
    const addInventoryBtn = document.getElementById('add-inventory-btn');
    const closeModalBtns = document.querySelectorAll('.close-modal, .cancel');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const inventorySearch = document.getElementById('inventory-search');
    const categoryFilter = document.getElementById('inventory-category-filter');
    const statusFilter = document.getElementById('inventory-status-filter');
    const sortSelect = document.getElementById('inventory-sort');
    const confirmActionBtn = document.getElementById('confirm-action');

    // Pagination variables
    let currentPage = 1;
    const itemsPerPage = 10;
    let filteredInventory = [];

    // Initialize the page
    function init() {
        renderInventoryTable();
        setupEventListeners();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Modal controls
        addInventoryBtn.addEventListener('click', openAddInventoryModal);
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', closeModal);
        });

        // Form submission
        inventoryForm.addEventListener('submit', handleInventorySubmit);

        // Pagination
        prevPageBtn.addEventListener('click', goToPrevPage);
        nextPageBtn.addEventListener('click', goToNextPage);

        // Filters and search
        inventorySearch.addEventListener('input', applyFilters);
        categoryFilter.addEventListener('change', applyFilters);
        statusFilter.addEventListener('change', applyFilters);
        sortSelect.addEventListener('change', applyFilters);

        // Confirmation modal
        confirmActionBtn.addEventListener('click', executeConfirmedAction);

        // Close modals when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === inventoryModal) {
                closeModal();
            }
            if (event.target === confirmModal) {
                closeConfirmModal();
            }
        });
    }

    // Render inventory table
    function renderInventoryTable() {
        inventoryList.innerHTML = '';
        
        // Apply filters and pagination
        applyFilters();
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = filteredInventory.slice(startIndex, endIndex);
        
        if (paginatedItems.length === 0) {
            inventoryList.innerHTML = `
                <tr>
                    <td colspan="10" class="no-results">
                        <i class="fas fa-box-open"></i>
                        <p>No inventory items found</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        paginatedItems.forEach(item => {
            const row = document.createElement('tr');
            const stockValue = item.quantity * item.price;
            
            // Determine status
            let statusClass = '';
            let statusText = '';
            
            if (item.quantity <= 0) {
                statusClass = 'status-out-of-stock';
                statusText = 'Out of Stock';
            } else if (item.quantity <= item.threshold) {
                statusClass = 'status-low-stock';
                statusText = 'Low Stock';
            } else {
                statusClass = 'status-in-stock';
                statusText = 'In Stock';
            }
            
            row.innerHTML = `
                <td>${item.productName}</td>
                <td>${item.sku}</td>
                <td>${capitalizeFirstLetter(item.category)}</td>
                <td>${item.size}</td>
                <td>${item.color}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${stockValue.toFixed(2)}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-table btn-edit" data-id="${item.id}">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn-table btn-delete" data-id="${item.id}">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </td>
            `;
            
            inventoryList.appendChild(row);
        });
        
        // Update pagination controls
        updatePaginationControls();
        
        // Add event listeners to action buttons
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', () => openEditInventoryModal(btn.dataset.id));
        });
        
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => openDeleteConfirmation(btn.dataset.id));
        });
    }

    // Apply filters and sorting
    function applyFilters() {
        const searchTerm = inventorySearch.value.toLowerCase();
        const category = categoryFilter.value;
        const status = statusFilter.value;
        const sortOption = sortSelect.value;
        
        // Filter by search term
        filteredInventory = inventoryData.filter(item => 
            item.productName.toLowerCase().includes(searchTerm) || 
            item.sku.toLowerCase().includes(searchTerm) ||
            item.color.toLowerCase().includes(searchTerm)
        );
        
        // Filter by category
        if (category !== 'all') {
            filteredInventory = filteredInventory.filter(item => item.category === category);
        }
        
        // Filter by status
        if (status !== 'all') {
            filteredInventory = filteredInventory.filter(item => {
                if (status === 'in-stock') return item.quantity > item.threshold;
                if (status === 'low-stock') return item.quantity > 0 && item.quantity <= item.threshold;
                if (status === 'out-of-stock') return item.quantity <= 0;
                return true;
            });
        }
        
        // Apply sorting
        switch (sortOption) {
            case 'name-asc':
                filteredInventory.sort((a, b) => a.productName.localeCompare(b.productName));
                break;
            case 'name-desc':
                filteredInventory.sort((a, b) => b.productName.localeCompare(a.productName));
                break;
            case 'stock-asc':
                filteredInventory.sort((a, b) => a.quantity - b.quantity);
                break;
            case 'stock-desc':
                filteredInventory.sort((a, b) => b.quantity - a.quantity);
                break;
            case 'value-asc':
                filteredInventory.sort((a, b) => (a.quantity * a.price) - (b.quantity * b.price));
                break;
            case 'value-desc':
                filteredInventory.sort((a, b) => (b.quantity * b.price) - (a.quantity * a.price));
                break;
        }
        
        // Reset to first page when filters change
        currentPage = 1;
        renderInventoryTable();
    }

    // Update pagination controls
    function updatePaginationControls() {
        const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
        
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
    }

    // Pagination functions
    function goToPrevPage() {
        if (currentPage > 1) {
            currentPage--;
            renderInventoryTable();
        }
    }

    function goToNextPage() {
        const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderInventoryTable();
        }
    }

    // Modal functions
    function openAddInventoryModal() {
        document.getElementById('inventory-modal-title').textContent = 'Add Inventory Item';
        inventoryForm.reset();
        inventoryForm.dataset.mode = 'add';
        inventoryModal.style.display = 'block';
    }

    function openEditInventoryModal(id) {
        const item = inventoryData.find(item => item.id == id);
        if (!item) return;
        
        document.getElementById('inventory-modal-title').textContent = 'Edit Inventory Item';
        inventoryForm.dataset.mode = 'edit';
        inventoryForm.dataset.id = id;
        
        // Populate form fields
        document.getElementById('inventory-product').value = item.productId;
        document.getElementById('inventory-sku').value = item.sku;
        document.getElementById('inventory-size').value = item.size;
        document.getElementById('inventory-color').value = item.color;
        document.getElementById('inventory-quantity').value = item.quantity;
        document.getElementById('inventory-threshold').value = item.threshold;
        document.getElementById('inventory-location').value = item.location || '';
        document.getElementById('inventory-notes').value = item.notes || '';
        
        inventoryModal.style.display = 'block';
    }

    function closeModal() {
        inventoryModal.style.display = 'none';
    }

    // Confirmation modal functions
    let itemToDelete = null;

    function openDeleteConfirmation(id) {
        itemToDelete = id;
        document.getElementById('confirm-message').textContent = 
            'Are you sure you want to delete this inventory item? This action cannot be undone.';
        confirmModal.style.display = 'block';
    }

    function closeConfirmModal() {
        confirmModal.style.display = 'none';
        itemToDelete = null;
    }

    function executeConfirmedAction() {
        if (itemToDelete) {
            deleteInventoryItem(itemToDelete);
        }
        closeConfirmModal();
    }

    // Inventory CRUD operations
    function handleInventorySubmit(e) {
        e.preventDefault();
        
        const formData = {
            productId: document.getElementById('inventory-product').value,
            sku: document.getElementById('inventory-sku').value,
            size: document.getElementById('inventory-size').value,
            color: document.getElementById('inventory-color').value,
            quantity: parseInt(document.getElementById('inventory-quantity').value),
            threshold: parseInt(document.getElementById('inventory-threshold').value),
            location: document.getElementById('inventory-location').value,
            notes: document.getElementById('inventory-notes').value
        };
        
        if (inventoryForm.dataset.mode === 'add') {
            addInventoryItem(formData);
        } else {
            updateInventoryItem(inventoryForm.dataset.id, formData);
        }
    }

    function addInventoryItem(data) {
        // In a real app, this would be an API call
        const newId = inventoryData.length > 0 ? Math.max(...inventoryData.map(item => item.id)) + 1 : 1;
        
        // Get product details (in a real app, this would come from a products API)
        const product = {
            id: data.productId,
            name: "Sample Product", // This would come from your products data
            category: "running", // This would come from your products data
            price: 99.99 // This would come from your products data
        };
        
        const newItem = {
            id: newId,
            productId: data.productId,
            productName: product.name,
            sku: data.sku,
            category: product.category,
            size: data.size,
            color: data.color,
            quantity: data.quantity,
            threshold: data.threshold,
            price: product.price,
            location: data.location,
            notes: data.notes,
            lastUpdated: new Date().toISOString().split('T')[0]
        };
        
        inventoryData.unshift(newItem);
        closeModal();
        renderInventoryTable();
        
        // Show success notification
        showNotification('Inventory item added successfully!', 'success');
    }

    function updateInventoryItem(id, data) {
        const index = inventoryData.findIndex(item => item.id == id);
        if (index === -1) return;
        
        // In a real app, this would be an API call
        inventoryData[index] = {
            ...inventoryData[index],
            sku: data.sku,
            size: data.size,
            color: data.color,
            quantity: data.quantity,
            threshold: data.threshold,
            location: data.location,
            notes: data.notes,
            lastUpdated: new Date().toISOString().split('T')[0]
        };
        
        closeModal();
        renderInventoryTable();
        
        // Show success notification
        showNotification('Inventory item updated successfully!', 'success');
    }

    function deleteInventoryItem(id) {
        // In a real app, this would be an API call
        inventoryData = inventoryData.filter(item => item.id != id);
        renderInventoryTable();
        
        // Show success notification
        showNotification('Inventory item deleted successfully!', 'success');
    }

    // Helper functions
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function showNotification(message, type) {
        // In a real app, you might use a more sophisticated notification system
        alert(`${type.toUpperCase()}: ${message}`);
    }

    // Initialize the page
    init();
});