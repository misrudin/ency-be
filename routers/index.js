const express = require('express');
const products = require('./products.routers')
const categories = require('./categories.routers')
const users = require('./users.routers')

const router = express.Router();

router.use('/products', products);
router.use('/categories', categories);
router.use('/users', users);

// router.use('/homepage', getHomepage);

module.exports = router;
