const express = require('express');
const products = require('./products.router')
const labels = require('./labels.router')
const users = require('./users.router')

const router = express.Router();

router.use('/products', products);
router.use('/labels', labels);
router.use('/users', users);

// router.use('/homepage', getHomepage);

module.exports = router;
