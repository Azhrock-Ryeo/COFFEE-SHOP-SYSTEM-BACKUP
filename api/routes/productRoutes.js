const express = require('express');
const router = express.Router();
const { getProducts, addProduct, updateProduct, removeProduct} = require('../controllers/productController');

// GET all items - URL: http://localhost:5000/products/
router.get('/', getProducts);

// POST a new item - URL: http://localhost:5000/products/
router.post('/', addProduct);

// PUT (Update) an item by ID - URL: http://localhost:5000/products/:id
router.put('/:id', updateProduct);

// DELETE an item by ID - URL: http://localhost:5000/products/:id
router.delete('/:id', removeProduct);

module.exports = router