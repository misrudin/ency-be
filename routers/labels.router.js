const express = require('express');
const labelController = require('../controllers/labels.controller')
const verifyAuth = require('../helpers/auth')

const router = express.Router();

router.get('/', labelController.getLabels);

router.get('/:id', labelController.getLabelById);

router.post('/', verifyAuth, labelController.addLabel);

router.put('/:id', verifyAuth, labelController.updateLabel);

router.delete('/:id', verifyAuth, labelController.deleteLabelById);

module.exports = router;