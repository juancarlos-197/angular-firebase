'use strict';

import {Router} from 'express';
import * as usuarios from './usuarios.controller';
/*import busqueda from './usuarios.controller';
import add from './usuarios.controller';*/


var router = new Router();

router.get('/a',usuarios.lista);
router.post('/b',usuarios.busqueda);
router.post('/c',usuarios.add);

module.exports = router;