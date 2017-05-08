'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/registro', {
      template: '<credito></credito>',
      authenticate: true
    });
}
