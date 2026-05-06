const express = require('express');
const router = express.Router();
const {
  getProducts,
  addProduct,
  updateProduct,
  removeProduct
} = require('../controllers/productController');

router.get('/', getProducts);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', removeProduct);

module.exports = router;