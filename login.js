// Handle the login form submission
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://mrd-star-f803babdf9bf.herokuapp.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            // Store the JWT token in localStorage
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            // Redirect to admin page after login
            window.location.href = '/admin';
        } else {
            alert(`Login failed: ${data.error}`);
        }
    } catch (err) {
        console.error('Error logging in:', err);
    }
});

// Check if the admin is authenticated
function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        // Redirect to login page if no token is found
        window.location.href = '/login';
    }
}

// Call checkAuth when the page loads to protect the admin page
window.onload = () => {
    checkAuth();
    fetchProducts();
};