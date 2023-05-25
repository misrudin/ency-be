const express = require('express');
const users = require('./users.router')
const labels = require('./labels.router')
const categories = require('./categories.router')
const products = require('./products.router')

const router = express.Router();

router.use('/users', users);
router.use('/labels', labels);
router.use('/categories', categories);
router.use('/products', products);

// router.use('/homepage', getHomepage);

module.exports = router;
