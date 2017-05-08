'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './usuarios.events';

var UsuariosSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(UsuariosSchema);
export default mongoose.model('Usuarios', UsuariosSchema);
