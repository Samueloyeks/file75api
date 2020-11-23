const express = require('express');
const BusinessRegistrationController = require('../Controllers/BusinessRegistration/LoadController');
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

router.post('/',
    // uploader.single('signatureImage'),
    BusinessRegistrationController.store,
    authGuard.protect
);
router.get('/', BusinessRegistrationController.index, authGuard.protect);
router.get('/:id', BusinessRegistrationController.show, authGuard.protect);
router.put('/deploy/:id',
    BusinessRegistrationController.deploy,
    // authGuard.protect,
    // adminGuard.isAdmin,
)

router.put('/finish/:id',
    uploader.single('responseFiles', 5),
    BusinessRegistrationController.finish,
    authGuard.protect,
    // adminGuard.isAdmin,
)

router.put('/reject/:id',
    uploader.single('responseFiles', 5),
    BusinessRegistrationController.reject,
    authGuard.protect,
    // adminGuard.isAdmin,
)

router.post('/individual/', BusinessRegistrationController.storeIndividual, authGuard.protect);
router.get('/individual/', BusinessRegistrationController.indexIndividual, authGuard.protect);
router.get('/individual/:id', BusinessRegistrationController.showIndividual, authGuard.protect);
router.put('/individual/deploy/:id',
    BusinessRegistrationController.deployIndividual,
    // authGuard.protect,
    // adminGuard.isAdmin,
)

router.put('/individual/finish/:id',
    uploader.single('responseFiles', 5),
    BusinessRegistrationController.finishIndividual,
    authGuard.protect,
    // adminGuard.isAdmin,
)

router.put('/individual/reject/:id',
    uploader.single('responseFiles', 5),
    BusinessRegistrationController.rejectIndividual,
    authGuard.protect,
    // adminGuard.isAdmin,
)

router.post('/uploadImage/',
    // uploader.single('image'),
    BusinessRegistrationController.saveImage,
    authGuard.protect
);


module.exports = router;
