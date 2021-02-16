const express = require('express');
const ArticlesOfAssociationController = require('../Controllers/ArticlesOfAssociation/LoadController');
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

router.get('/', ArticlesOfAssociationController.index, authGuard.protect);



module.exports = router;
