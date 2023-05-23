const express = require('express');
const customerController = require('../controllers/users.controller')
const verifyAuth = require('../helpers/auth')

const router = express.Router();

router.post('/login', customerController.login);

router.post('/register', customerController.register);

router.put('/set-gender', verifyAuth, customerController.setAgeAndGender);

module.exports = router;
