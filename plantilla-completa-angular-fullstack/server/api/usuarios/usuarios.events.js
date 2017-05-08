/**
 * Usuarios model events
 */

'use strict';

import {EventEmitter} from 'events';
var UsuariosEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UsuariosEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Usuarios) {
  for(var e in events) {
    let event = events[e];
    Usuarios.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    UsuariosEvents.emit(event + ':' + doc._id, doc);
    UsuariosEvents.emit(event, doc);
  };
}

export {registerEvents};
export default UsuariosEvents;
