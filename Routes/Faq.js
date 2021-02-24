const express = require('express');
const FaqController = require('../Controllers/Faq/LoadController');
const authGuard = require('../Guards/Auth');

const router = express.Router();

router.get('/',
    FaqController.getFaq,
    authGuard.protect
);



module.exports = router;
