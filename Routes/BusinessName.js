const express = require('express');
const businessNameController = require('../Controllers/BusinessName/LoadController');
const authGuard = require('../Guards/Auth');

const router = express.Router();

router.post('/reserveName', businessNameController.reserveName,authGuard.protect);


module.exports = router;
