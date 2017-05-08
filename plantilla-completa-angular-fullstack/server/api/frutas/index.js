'use strict';

import {Router} from 'express';
import * as frutas from './frutas.controller';
import naranja from './frutas.controller';
import {manzana} from './frutas.controller';

var router = new Router();
//     api/frutas/n
router.get('/',manzana);
router.get('/n',naranja);
router.post('/',frutas.hola);

module.exports = router;