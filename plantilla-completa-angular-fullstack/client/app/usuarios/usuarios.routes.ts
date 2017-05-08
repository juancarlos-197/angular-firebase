'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/usuarios', {
      template: '<usuarios></usuarios>'
    });
}
