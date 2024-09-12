// Fetch and display products from the backend
async function fetchProducts() {
    const response = await fetch('https://mrd-star-f803babdf9bf.herokuapp.com/api/listings');
    const products = await response.json();
  
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear previous content
  
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
      `;
      productList.appendChild(productDiv);
    });
  }
  
  // Call fetchProducts when the page loads
  window.onload = fetchProducts;