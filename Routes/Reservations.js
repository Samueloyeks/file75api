const express = require('express');
const ReservationController = require('../Controllers/Reservations/LoadController');
const authGuard = require('../Guards/Auth');
const adminGuard = require('../Guards/Admin');


const router = express.Router();

router.post('/', authGuard.protect);
router.get('/', ReservationController.index, authGuard.protect);
router.get('/:id', ReservationController.show, authGuard.protect);
router.put('/deploy/:id',
    // authGuard.protect,
    // adminGuard.isAdmin,
    ReservationController.deploy
)

router.put('/finish/:id',
    // authGuard.protect,
    // adminGuard.isAdmin,
    ReservationController.finish
)


module.exports = router;
