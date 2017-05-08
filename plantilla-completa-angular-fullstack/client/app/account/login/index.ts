'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');
import LoginController from './login.controller';

export default angular.module('plantillaApp.login', [ngRoute])
  .controller('LoginController', LoginController)
  .name;
