const express = require('express');
const productController = require('../controllers/products.controller')
const verifyAuth = require('../helpers/auth')

const router = express.Router();

router.get('/', productController.getProducts);

router.get('/:id', productController.getProductById);

router.post('/', verifyAuth, productController.addProduct);

router.put('/:id', verifyAuth, productController.updateProduct);

router.delete('/:id', verifyAuth, productController.deleteProductById);

module.exports = router;