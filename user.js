// DOM Elements
const authOptions = document.getElementById('auth-options');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginForm = document.getElementById('login-form');
const loginFormElement = document.getElementById('loginForm');
const cancelLogin = document.getElementById('cancel-login');
const authStatus = document.getElementById('auth-status');

// Admin credentials (in a real app, these would be verified server-side)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    updateUI(isLoggedIn);
});

// Login button click handler
loginBtn.addEventListener('click', () => {
    loginForm.classList.remove('hidden');
    authOptions.classList.add('hidden');
});

// Cancel login button click handler
cancelLogin.addEventListener('click', () => {
    loginForm.classList.add('hidden');
    authOptions.classList.remove('hidden');
});

// Logout button click handler
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    updateUI(false);
    authStatus.textContent = 'You have been logged out successfully.';
    setTimeout(() => {
        window.location.href = 'user.html'; // Refresh the page
    }, 1500);
});

// Login form submission handler
loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validate credentials (in a real app, this would be a server-side check)
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('isLoggedIn', 'true');
        updateUI(true);
        window.location.href = 'admin.html'; // Redirect to admin page
    } else {
        authStatus.textContent = 'Invalid credentials. Please try again.';
        authStatus.style.color = 'red';
    }
});

// Update UI based on authentication status
function updateUI(isLoggedIn) {
    if (isLoggedIn) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        authStatus.textContent = 'You are logged in as admin.';
        authStatus.style.color = 'green';
    } else {
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        authStatus.textContent = 'Please login to access admin features.';
        authStatus.style.color = 'black';
    }
    
    loginForm.classList.add('hidden');
    authOptions.classList.remove('hidden');
}