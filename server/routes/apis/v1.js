const express = require('express');
let router = express.Router();

const userController = require('../../controllers/apis/v1/users');
const authController = require('../../controllers/apis/v1/auth');
const debitController = require('../../controllers/apis/v1/debit');
const creditController = require('../../controllers/apis/v1/credit');

router.use('/users', userController);
router.use('/auth', authController);
router.use('/credit', creditController);
router.use('/debit', debitController);

module.exports = router;