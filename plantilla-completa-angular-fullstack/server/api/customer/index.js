'use strict';

/**
 * /api/customers   -> index
 */

var express = require('express');
var controller = require('./customer.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/add', controller.add);

module.exports = router;
