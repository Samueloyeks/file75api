const express = require('express');
const ReservationController = require('../Controllers/Reservations/LoadController');
const authGuard = require('../Guards/Auth');
const adminGuard = require('../Guards/Admin');
const multer = require('multer');


const uploader = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});


const router = express.Router(); 

router.post('/', ReservationController.store, authGuard.protect);
router.get('/', ReservationController.index, authGuard.protect);
router.get('/:id', ReservationController.show, authGuard.protect);
router.put('/deploy/:id',
    ReservationController.deploy,
    // authGuard.protect,
    // adminGuard.isAdmin,
)

router.put('/finish/:id',
    uploader.single('responseFiles', 5),
    ReservationController.finish,
    authGuard.protect, 
    // adminGuard.isAdmin,
)

router.put('/reject/:id',
    uploader.single('responseFiles', 5),
    ReservationController.reject,
    authGuard.protect,
    // adminGuard.isAdmin,
)


module.exports = router;
