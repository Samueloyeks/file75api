const express = require('express');
const CompanyRegistrationController = require('../Controllers/CompanyRegistration/LoadController');
const authGuard = require('../Guards/Auth');
const adminGuard = require('../Guards/Admin');
const multer = require('multer');

const router = express.Router();

router.get('/', 
    CompanyRegistrationController.getBusinessObjects,
    authGuard.protect
);



module.exports = router;
