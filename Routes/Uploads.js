const express = require('express');
const UploadsController = require('../Controllers/Uploads/LoadController');
const authGuard = require('../Guards/Auth');
const adminGuard = require('../Guards/Admin');


const router = express.Router();

router.post('/nameReservation', UploadsController.uploadFile, authGuard.protect);
router.get('/', UploadsController.downloadFile, authGuard.protect);

// router.get('/', ReservationController.index, authGuard.protect);


module.exports = router;
