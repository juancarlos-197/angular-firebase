'use strict';

const angular = require('angular');

export class Usuario{

    constructor(){

    }

    public hola():any{
        return {nombre:'isaac',id:123123,habilitado:true};
    }
}

export default angular.module('plantillaApp.usuarios',[])
    .component('usuarios',{
        template: require('./usuarios.html'),
        controller: Usuario,
        controllerAs: 'us'
    })
    .name;