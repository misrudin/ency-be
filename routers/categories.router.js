const express = require('express');
const categoryController = require('../controllers/categories.controller')
const verifyAuth = require('../helpers/auth')

const router = express.Router();

router.get('/', categoryController.getCategories);

router.get('/:id', categoryController.getCategoryById);

router.post('/', verifyAuth, categoryController.addCategory);

router.put('/:id', verifyAuth, categoryController.updateCategory);

router.delete('/:id', verifyAuth, categoryController.deleteCategoryById);

module.exports = router;