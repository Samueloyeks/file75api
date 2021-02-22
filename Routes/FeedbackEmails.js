const express = require('express');
const FeedbackEmailController = require('../Controllers/FeedbackEmails/LoadController');
const authGuard = require('../Guards/Auth');
const adminGuard = require('../Guards/Admin');
const multer = require('multer');


const router = express.Router(); 

router.post('/', FeedbackEmailController.store, authGuard.protect);
router.get('/', FeedbackEmailController.index, authGuard.protect);
router.get('/:id', FeedbackEmailController.show, authGuard.protect);


module.exports = router;
