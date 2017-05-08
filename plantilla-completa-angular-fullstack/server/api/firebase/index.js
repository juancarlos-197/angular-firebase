'use strict';

var express = require('express');
var controller = require('./firebase.controller');

var router = express.Router();

router.post('/add',controller.add);
router.get('/get',controller.get);
router.get('/creditos',controller.creditos);
router.post('/agregarSolicitud', controller.addSolicitud);

module.exports = router;