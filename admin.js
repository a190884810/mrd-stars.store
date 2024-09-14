let editing = false; // To track whether we're editing a product

// Fetch and display products from the backend
async function fetchProducts() {
    try {
        const response = await fetch('https://mrd-star-f803babdf9bf.herokuapp.com/api/products');
        const products = await response.json();

        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Clear previous content

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p class="price">$${product.price}</p>
        <button onclick="openEditModal(${product.id}, '${product.name}', '${product.description}', ${product.price})">Edit</button>
        <button onclick="confirmDelete(${product.id})" class="delete-btn">Delete</button>
      `;
            productList.appendChild(productCard);
        });
    } catch (err) {
        console.error('Error fetching products:', err);
        alert('Failed to load products');
    }
}

// Handle Add Product Form submission
const addForm = document.getElementById('add-product-form');
addForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('add-name').value;
    const description = document.getElementById('add-description').value;
    const price = document.getElementById('add-price').value;
    const imageFile = document.getElementById('product-image').files[0];

    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in as an admin to add a product.');
        return;
    }

    // Create FormData object to send form data and file
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    if (imageFile) {
        formData.append('image', imageFile); // Append the image file
    }

    try {
        const response = await fetch('https://mrd-star-f803babdf9bf.herokuapp.com/api/products', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            alert('Product added successfully!');
            fetchProducts(); // Refresh the product list
            addForm.reset(); // Clear the form
        } else {
            const error = await response.json();
            alert(`Failed to add product: ${error.error}`);
        }
    } catch (err) {
        console.error('Error adding product:', err);
    }
});

// Confirm deletion and delete the product
function confirmDelete(productId) {
    const confirmed = window.confirm('Are you sure you want to delete this product?');

    if (confirmed) {
        deleteProduct(productId);
    }
}

// Function to delete the product
async function deleteProduct(productId) {
    const token = localStorage.getItem('token'); // JWT token from login
    if (!token) {
        alert('You must be logged in as an admin to delete a product.');
        return;
    }

    try {
        const response = await fetch(`https://mrd-star-f803babdf9bf.herokuapp.com/api/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            alert('Product deleted successfully!');
            fetchProducts(); // Refresh the product list after deletion
        } else {
            const error = await response.json();
            alert(`Failed to delete product: ${error.error}`);
        }
    } catch (err) {
        console.error('Error deleting product:', err);
    }
}

// Open Edit Modal and populate it with product details
function openEditModal(id, name, description, price) {
    document.getElementById('edit-product-id').value = id;
    document.getElementById('edit-name').value = name;
    document.getElementById('edit-description').value = description;
    document.getElementById('edit-price').value = price;

    // Show the modal
    document.getElementById('edit-modal').style.display = 'block';
}

// Handle Edit Product Form submission
const editForm = document.getElementById('edit-product-form');
editForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const productId = document.getElementById('edit-product-id').value;
    const name = document.getElementById('edit-name').value;
    const description = document.getElementById('edit-description').value;
    const price = document.getElementById('edit-price').value;

    const token = localStorage.getItem('token');
    if (!token) {
        alert('You must be logged in as an admin to edit a product.');
        return;
    }

    try {
        const response = await fetch(`https://mrd-star-f803babdf9bf.herokuapp.com/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, description, price })
        });

        if (response.ok) {
            alert('Product updated successfully!');
            fetchProducts(); // Refresh the product list
            closeModal(); // Close the modal
        } else {
            const error = await response.json();
            alert(`Failed to update product: ${error.error}`);
        }
    } catch (err) {
        console.error('Error updating product:', err);
    }
});

// Close the Edit Modal
function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

// Close the modal when clicking the close button
document.getElementById('close-modal').addEventListener('click', closeModal);

// Load products when the page loads
window.onload = fetchProducts;
