'use strict';

export default function routes($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/creditos', {
      template: '<creditos></creditos>',
      authenticate: true
    });
};
