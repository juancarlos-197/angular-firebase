'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/tabla', {
      template: '<tabla></tabla>'
    });
}
