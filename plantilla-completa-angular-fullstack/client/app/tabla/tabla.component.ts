'use strict';

const angular = require('angular');
const ngRoute = require('angular-route');

import TablaBase from '../../components/object/base/TablaBase'; 
import routes from './tabla.routes';

export class TablaComponent extends TablaBase{

    constructor($rootScope,$scope,$cookies,$http,Tb){
        super($rootScope,$scope,$cookies,'/api/tabla',{},$http,'userarray',Tb);
    }

    $onInit(){
        super.$onInit();
        this.setTitle("Ejemplo de tabla");
        this._Tb.showToolbarBurger();
        this._Tb.hideMenuBar();
        this.setToolbarOption();
        /*this.on(function(respuesta){
            
        }.bind(this));*/
    
    }

    public obtenerDatos(){
        this.json = {max:"hola",min:3224};
        
        this.on(function(respuesta){
/*            this.saveDataJSONTemp(respuesta.data);
            $location.path('/nueva');
            let obj = this.getDataJSONTemp();
            obj.hola;
            obj.adios;*/
        }.bind(this));
    }
}

export default angular.module('plantillaApp.tabla',[
    ngRoute
])
.config(routes)
.component('tabla',{
    template:require('./tabla.html'),
    controller:TablaComponent,
    controllerAs:'tc'
}).name;