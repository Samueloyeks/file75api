const express = require('express');
const serviceCategoryController = require('../Controllers/ServiceCategories/LoadController');
const authGuard = require('../Guards/Auth');

const router = express.Router();

router.post('/', serviceCategoryController.store, authGuard.protect);
router.get('/', serviceCategoryController.index, authGuard.protect);
router.get('/:id', serviceCategoryController.show, authGuard.protect);


module.exports = router;
