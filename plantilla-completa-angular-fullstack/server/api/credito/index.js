'use strict'

var express = require('express');
var controller = require('./credito.controller');

var router = express.Router();

router.post('/add', controller.add);
router.post('/get', controller.get);
module.exports = router;
