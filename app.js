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
                <img src="${product.image ? product.image : 'placeholder.jpg'}" alt="${product.name}" class="product-image">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p class="price">$${product.price}</p>
                <button onclick="alert('Added to cart: ${product.name}')">Add to Cart</button>
            `;
            productList.appendChild(productCard);
        });
    } catch (err) {
        console.error('Error fetching products:', err);
        alert('Failed to load products');
    }
}

window.onload = fetchProducts;