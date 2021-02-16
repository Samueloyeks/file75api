const express = require('express');
const BusinessRegistrationController = require('../Controllers/BusinessRegistration/LoadController');
const authGuard = require('../Guards/Auth');
const adminGuard = require('../Guards/Admin');
const multer = require('multer');

const router = express.Router();

router.get('/', 
BusinessRegistrationController.getNaturesOfBusiness,
    authGuard.protect
);



module.exports = router;
