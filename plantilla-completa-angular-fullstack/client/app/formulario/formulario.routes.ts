'use strict';

export default function routes($routeProvider){
    'ngInject';
    $routeProvider
        .when('/formulario',{
            template: require('./formulario.html'),
            controller: 'FormularioController',
            controllerAs: 'fm'
        });
}