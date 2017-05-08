
'use stric';

var express=require('express');
var controller= require('./creditos.controller');

var router=express.Router();

router.get('/creditos',controller.creditos);
router.post('/',controller.creditos);


module.exports=router;



