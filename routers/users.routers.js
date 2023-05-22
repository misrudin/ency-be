const express = require('express');
const customerController = require('../controllers/users.controller')

const router = express.Router();

router.post('/login', customerController.login);

router.post('/register', customerController.register);

router.get('/reset-password', (req, res) => {
  res.json({ message: 'API is running' });
});

router.get('/forgot-password', (req, res) => {
  res.json({ message: 'API is running' });
});

router.get('/verification', (req, res) => {
  res.json({ message: 'API is running' });
});

module.exports = router;
