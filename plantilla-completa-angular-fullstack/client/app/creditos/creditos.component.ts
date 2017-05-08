'use strict'

const angular = require("angular");
const ngRoute = require("angular-route");
import TablaBase from '../../components/object/base/TablaBase'; 
import routes from './creditos.routes';

export class TablaComponent extends TablaBase{
    public rango:any;
    public max:number;
    public min:number;
    public $location:any;
    

    constructor($rootScope,$scope,$location,$cookies,$http,Tb){
        super($rootScope,$scope,$cookies,'/api/creditos',{},$http,null,Tb);
        this.$location = $location;
    }
    
    $onInit(){
        super.$onInit();
        this.setTitle("Creditos");
        this._Tb.showToolbarRegreso();
        this._Tb.hideMenuBar();
        this.setToolbarOption();  
        this.initCallback();     
    }

    public initCallback() {
        this.setReadyF(function (result) {
        });
        this.setErrorF(function (error) {
        console.log('Siguiente error', error);
        });
        this.setSelectF(function (item) {
            this.selectClick(item);
        });
    }

    /**
     * Redirect to the clicked aclaracion and store in cookies the @param aclaracion
     * @argument aclaracion clicked aclaracion
     */
    public selectClick(credit: Object) {
        this.saveDataTemp(JSON.stringify(credit));
        this.$location.path('/datosCredito');
    }
    
    public obtenerCreditos(){
        this.json={max:this.max,min:this.min};
        this.on(function(respuesta){
            this._lista.forEach(function(element) {
                let pla = "";
                Object.keys(element.plazo).forEach(function(ite){
                    pla = pla + ite + ",";
                });
                element.plazos = pla.substr(0, pla.length-1);
                element.plazo = Object.keys(element.plazo);
            });
        }.bind(this));
    }
}

export default angular.module('plantillaApp.creditos',[
    ngRoute
]).config(routes)
.component('creditos',{
    template:require('./creditos.html'),
    controller: TablaComponent, 
    controllerAs: 'cc'
}).name;