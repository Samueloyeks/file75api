const express = require('express');
const transactionController = require('../Controllers/Transaction/LoadController');
const authGuard = require('../Guards/Auth');

const router = express.Router();

router.post('/saveTransaction', transactionController.reserveName,authGuard.protect);


module.exports = router;
