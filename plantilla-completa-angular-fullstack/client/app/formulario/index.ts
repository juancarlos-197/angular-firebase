'use strict';

const angular = require('angular');
import routes from './formulario.routes';
import FormularioController from './formulario.component';

export default angular.module('plantillaApp.formulario',[])
    .config(routes)
    .controller('FormularioController',FormularioController)
    .name;