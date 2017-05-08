'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/frutas', {
      template: '<frutas></frutas>'
    });
}
