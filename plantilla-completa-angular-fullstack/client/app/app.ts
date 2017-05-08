'use strict';
const angular = require('angular');
// import ngAnimate from 'angular-animate';
const ngCookies = require('angular-cookies');
const ngResource = require('angular-resource');
const ngSanitize = require('angular-sanitize');
import 'angular-socket-io';
const ngRoute = require('angular-route');
const ngMaterial = require('angular-material');
const ngAnimate = require('angular-animate');
const ngTable = require('angular-material-data-table');
const firebase = require('firebase');


// const ngMessages = require('angular-messages');
// import ngValidationMatch from 'angular-validation-match';


import {routeConfig} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import creditos from './creditos/creditos.component';
import datosCredito from './datosCredito/datosCredito.component';
import navbar from '../components/navbar/navbar.component';
import menubar from '../components/menubar/menubar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import formulario from './formulario';
import frutas from './frutas/frutas.component';
import tabla from './tabla/tabla.component';
import usuarios from './usuarios/usuarios.component';
import credito from './credito/credito.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';


import './app.scss';

angular.module('plantillaApp', [
  ngCookies,
  ngResource,
  ngSanitize,

  'btford.socket-io',

  ngRoute,
  ngMaterial,
  ngAnimate,
  ngTable,

  _Auth,
  account,
  admin,  navbar,
  menubar,
  footer,
  main,
  creditos,
  frutas,
  tabla,
  formulario,
  datosCredito,
  usuarios,
  credito,
  constants,
  socket,
  util
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function(event, next) {
        if(next.authenticate && !Auth.isLoggedIn()) {
          $location.path('/login');
        }
    });
    var config = {
      apiKey: "AIzaSyBzVW96VWEEPtnrXGVwhhlg1ntH4_7mfBg",
      authDomain: "yunius-b4eee.firebaseapp.com",
      databaseURL: "https://yunius-b4eee.firebaseio.com",
      projectId: "yunius-b4eee",
      storageBucket: "yunius-b4eee.appspot.com",
      messagingSenderId: "411839544542"
    };
    firebase.initializeApp(config);
  });

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['plantillaApp'], {
      strictDi: true
    });
  });
