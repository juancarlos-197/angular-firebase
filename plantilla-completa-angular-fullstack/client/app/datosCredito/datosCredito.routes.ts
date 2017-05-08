'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/datosCredito', {
      template: '<datos_credito></datos_credito>',
      authenticate: true
    });
}
