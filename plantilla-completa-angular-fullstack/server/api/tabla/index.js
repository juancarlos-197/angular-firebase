'use strict';

import {Router} from 'express';
import * as controller from './tabla.controller';

var router = new Router();

router.post('/',controller.user);

module.exports = router;