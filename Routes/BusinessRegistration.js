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
    authGuard.protect,
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

router.post('/uploadImage/',
    // uploader.array("files[]", 12),
    BusinessRegistrationController.saveImage,
    authGuard.protect
);

router.put('/markAsViewed/:id',
    BusinessRegistrationController.markAsViewed,
    // authGuard.protect,
    // adminGuard.isAdmin,
)


module.exports = router;
