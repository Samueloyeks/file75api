const express = require('express');
const CompanyRegistrationController = require('../Controllers/CompanyRegistration/LoadController');
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
    CompanyRegistrationController.store,
    authGuard.protect
);
router.get('/', CompanyRegistrationController.index, authGuard.protect);
router.get('/:id', CompanyRegistrationController.show, authGuard.protect);
router.put('/deploy/:id',
    CompanyRegistrationController.deploy,
    authGuard.protect,
    // adminGuard.isAdmin,
)

router.put('/finish/:id',
    uploader.single('responseFiles', 5),
    CompanyRegistrationController.finish,
    authGuard.protect,
    // adminGuard.isAdmin,
)

router.put('/reject/:id',
    uploader.single('responseFiles', 5),
    CompanyRegistrationController.reject,
    authGuard.protect,
    // adminGuard.isAdmin,
)

router.post('/uploadImage/',
    // uploader.array("files[]", 12),
    CompanyRegistrationController.saveImage,
    authGuard.protect
);


module.exports = router;
