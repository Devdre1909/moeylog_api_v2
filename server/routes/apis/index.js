const express = require('express');
let router = express.Router();

const v1ApiController = require('./v1');

router.use('/v1', v1ApiController);

module.exports = router;