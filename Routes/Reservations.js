const express = require('express');
const ReservationController = require('../Controllers/Reservations/LoadController');
const authGuard = require('../Guards/Auth');

const router = express.Router();

router.post('/', ReservationController.store, authGuard.protect);
router.get('/', ReservationController.index, authGuard.protect);
router.get('/:id', ReservationController.show, authGuard.protect);


module.exports = router;
