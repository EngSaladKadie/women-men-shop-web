document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const inventoryList = document.getElementById('inventory-list');
    const inventoryModal = document.getElementById('inventory-modal');
    const addInventoryBtn = document.getElementById('add-inventory');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.cancel');
    const inventoryForm = document.getElementById('inventory-form');
    const inventoryQuantity = document.getElementById('inventory-quantity');
    const inventoryCost = document.getElementById('inventory-cost');
    const inventoryTotal = document.getElementById('inventory-total');
    const categoryFilter = document.getElementById('inventory-category-filter');
    const statusFilter = document.getElementById('inventory-status-filter');
    const searchInventory = document.getElementById('search-inventory');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    const stockMovements = document.getElementById('stock-movements');
    const inventoryAlerts = document.getElementById('inventory-alerts');
    const exportBtn = document.getElementById('export-inventory');
    const importBtn = document.getElementById('import-inventory');

    // Sample data - in a real app, this would come from an API
    let inventoryData = [
        { id: 1, productId: 'SH001', name: 'Nike Air Max', category: 'running', size: '9', color: 'Black', stock: 15, lowStockAlert: 5, status: 'in-stock', lastUpdated: '2023-05-15' },
        { id: 2, productId: 'SH002', name: 'Adidas Superstar', category: 'casual', size: '8', color: 'White', stock: 3, lowStockAlert: 5, status: 'low-stock', lastUpdated: '2023-05-18' },
        { id: 3, productId: 'SH003', name: 'Puma RS-X', category: 'casual', size: '10', color: 'Red', stock: 0, lowStockAlert: 5, status: 'out-of-stock', lastUpdated: '2023-05-10' },
        { id: 4, productId: 'SH004', name: 'Nike React Infinity', category: 'running', size: '11', color: 'Blue', stock: 8, lowStockAlert: 5, status: 'in-stock', lastUpdated: '2023-05-20' },
        { id: 5, productId: 'SH005', name: 'Adidas Ultraboost', category: 'running', size: '9', color: 'Black', stock: 12, lowStockAlert: 5, status: 'in-stock', lastUpdated: '2023-05-17' },
        { id: 6, productId: 'SH006', name: 'New Balance 574', category: 'casual', size: '7', color: 'Gray', stock: 4, lowStockAlert: 5, status: 'low-stock', lastUpdated: '2023-05-19' },
        { id: 7, productId: 'SH007', name: 'Nike Jordan 1', category: 'basketball', size: '10', color: 'Red', stock: 6, lowStockAlert: 5, status: 'in-stock', lastUpdated: '2023-05-16' },
        { id: 8, productId: 'SH008', name: 'Adidas Predator', category: 'soccer', size: '8', color: 'Black', stock: 7, lowStockAlert: 5, status: 'in-stock', lastUpdated: '2023-05-14' },
        { id: 9, productId: 'SH009', name: 'Puma Future', category: 'soccer', size: '9', color: 'White', stock: 2, lowStockAlert: 5, status: 'low-stock', lastUpdated: '2023-05-21' },
        { id: 10, productId: 'SH010', name: 'Nike Mercurial', category: 'soccer', size: '10', color: 'Multi', stock: 9, lowStockAlert: 5, status: 'in-stock', lastUpdated: '2023-05-12' }
    ];

    let stockMovementData = [
        { date: '2023-05-21', product: 'Nike Air Max', type: 'Sale', quantity: -2, user: 'John Doe' },
        { date: '2023-05-20', product: 'Adidas Ultraboost', type: 'Restock', quantity: 5, user: 'Jane Smith' },
        { date: '2023-05-19', product: 'New Balance 574', type: 'Sale', quantity: -1, user: 'Mike Johnson' },
        { date: '2023-05-18', product: 'Puma RS-X', type: 'Return', quantity: 1, user: 'Sarah Williams' },
        { date: '2023-05-17', product: 'Nike React Infinity', type: 'Sale', quantity: -3, user: 'David Brown' }
    ];

    let alertData = [
        { type: 'warning', message: 'Adidas Superstar (Size 8) is low on stock (3 remaining)', date: '2 hours ago' },
        { type: 'danger', message: 'Puma RS-X (Size 10) is out of stock', date: '1 day ago' },
        { type: 'warning', message: 'New Balance 574 (Size 7) is low on stock (4 remaining)', date: '2 days ago' },
        { type: 'warning', message: 'Puma Future (Size 9) is low on stock (2 remaining)', date: '3 days ago' }
    ];

    // Pagination variables
    let currentPage = 1;
    const itemsPerPage = 5;
    let filteredData = [...inventoryData];

    // Initialize the page
    function init() {
        renderInventoryTable();
        renderStockMovements();
        renderInventoryAlerts();
        setupEventListeners();
    }

    // Render inventory table
    function renderInventoryTable() {
        inventoryList.innerHTML = '';
        
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = filteredData.slice(startIndex, endIndex);
        
        if (paginatedData.length === 0) {
            inventoryList.innerHTML = '<tr><td colspan="10" class="text-center">No inventory items found</td></tr>';
            return;
        }
        
        paginatedData.forEach(item => {
            const row = document.createElement('tr');
            
            // Determine status class
            let statusClass = '';
            let statusText = '';
            if (item.status === 'in-stock') {
                statusClass = 'in-stock';
                statusText = 'In Stock';
            } else if (item.status === 'low-stock') {
                statusClass = 'low-stock';
                statusText = 'Low Stock';
            } else {
                statusClass = 'out-of-stock';
                statusText = 'Out of Stock';
            }
            
            row.innerHTML = `
                <td>${item.productId}</td>
                <td>${item.name}</td>
                <td>${capitalizeFirstLetter(item.category)}</td>
                <td>${item.size}</td>
                <td>${item.color}</td>
                <td>${item.stock}</td>
                <td>${item.lowStockAlert}</td>
                <td><span class="status ${statusClass}">${statusText}</span></td>
                <td>${formatDate(item.lastUpdated)}</td>
                <td>
                    <button class="btn small secondary edit-inventory" data-id="${item.id}"><i class="fas fa-edit"></i></button>
                    <button class="btn small danger delete-inventory" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                </td>
            `;
            
            inventoryList.appendChild(row);
        });
        
        // Update pagination info
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        
        // Disable/enable pagination buttons
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
    }

    // Render stock movements
    function renderStockMovements() {
        stockMovements.innerHTML = '';
        
        stockMovementData.forEach(movement => {
            const row = document.createElement('tr');
            
            // Determine quantity class
            const quantityClass = movement.quantity > 0 ? 'text-success' : 'text-danger';
            const quantitySymbol = movement.quantity > 0 ? '+' : '';
            
            row.innerHTML = `
                <td>${formatDate(movement.date)}</td>
                <td>${movement.product}</td>
                <td>${movement.type}</td>
                <td class="${quantityClass}">${quantitySymbol}${movement.quantity}</td>
                <td>${movement.user}</td>
            `;
            
            stockMovements.appendChild(row);
        });
    }

    // Render inventory alerts
    function renderInventoryAlerts() {
        inventoryAlerts.innerHTML = '';
        
        alertData.forEach(alert => {
            const alertItem = document.createElement('div');
            alertItem.className = `alert-item ${alert.type}`;
            
            alertItem.innerHTML = `
                <i class="fas ${alert.type === 'warning' ? 'fa-exclamation-triangle' : 'fa-exclamation-circle'}"></i>
                <div>
                    <p>${alert.message}</p>
                    <small class="text-muted">${alert.date}</small>
                </div>
            `;
            
            inventoryAlerts.appendChild(alertItem);
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        // Modal controls
        addInventoryBtn.addEventListener('click', () => {
            document.getElementById('inventory-modal-title').textContent = 'Add Stock to Inventory';
            inventoryForm.reset();
            inventoryModal.style.display = 'flex';
        });
        
        closeModalBtn.addEventListener('click', () => {
            inventoryModal.style.display = 'none';
        });
        
        cancelBtn.addEventListener('click', () => {
            inventoryModal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === inventoryModal) {
                inventoryModal.style.display = 'none';
            }
        });
        
        // Calculate total cost
        inventoryQuantity.addEventListener('input', calculateTotal);
        inventoryCost.addEventListener('input', calculateTotal);
        
        // Form submission
        inventoryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            saveInventoryItem();
        });
        
        // Filter controls
        // categoryFilter.addEventListener('change', filterInventory);
        // statusFilter.addEventListener('change', filterInventory);
        // searchInventory.addEventListener('input', filterInventory);
    }
});

   