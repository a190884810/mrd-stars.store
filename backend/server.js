const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3000;

// Enable CORS for all requests (You can restrict this if needed)
app.use(cors());

// Dummy goods data
const goods = [
    { id: 1, name: 'Item 1', description: 'This is Item 1', price: 100, image: 'https://via.placeholder.com/200' },
    { id: 2, name: 'Item 2', description: 'This is Item 2', price: 150, image: 'https://via.placeholder.com/200' },
    { id: 3, name: 'Item 3', description: 'This is Item 3', price: 200, image: 'https://via.placeholder.com/200' }
];

// Set up a route to serve the goods data
app.get('/api/goods', (req, res) => {
    res.json(goods);
});

// Start the server
app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
