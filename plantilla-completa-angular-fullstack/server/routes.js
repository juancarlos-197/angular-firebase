/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/customers', require('./api/customer'));
  app.use('/api/usuarios', require('./api/usuarios'));
  app.use('/api/frutas', require('./api/frutas'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/user', require('./api/user'));
  app.use('/api/tabla', require('./api/tabla'));
  app.use('/api/firebase', require('./api/firebase'));
  app.use('/api/creditos',require('./api/creditos'));
  app.use('/api/credito', require('./api/credito'));
  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
