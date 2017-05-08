'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './credito.routes';
import Base from '../../components/object/base/Base';

export class CreditoComponent extends Base {

    private $http: any;
    private API_path_add:string = '/api/credito/add';

    public message: string;
    public empresa: string;
    public eleccionPlazo: string;
    public valorInteres: number;
    public min: number;
    public max: number;
    public plazos: string;
    public _respuesta = '';

    constructor($rootScope, Tb, $http) {
        super($rootScope, Tb);
        this.$http = $http;
    }

    $onInit() {
        super.$onInit();
        this.setTitle("Registro de créditos");
        this._Tb.showToolbarRegreso();
        this._Tb.hideMenuBar();
        this.setToolbarOption();
    }

    /**
     * De los datos disponibles se estructura en un JSON y se devuelve uno de estos
     * listo para usarse.
     * @formatearDatos
     */
    public formatearDatos(): any {
        let resultado = {}
        var modeloCredito = {}
        if (this.plazos != '' && this.plazos != null) {
            this.plazos.split("-").map(Number).map(function (unPlazo) {
                resultado[unPlazo] = true;
            });
            modeloCredito = {
                max: this.max,
                min: this.min,
                plazo: resultado,
                empresa: this.empresa,
                interes: this.valorInteres
            }
        }
        return modeloCredito;
    }

    /**
     * Almacena el mensaje que se mostrará luego de un suceso
     * @mensajeAccion
     */
    public mensajeAccion(mensaje: string) {
        this._respuesta = mensaje;
    }

    /**
     * Borra la respuesta que se muestra de dar click
     * @borrarMensaje
     */
    public borrarMensaje() {
        this._respuesta = '';
    }

    /**
     * Este método registra en firebase los datos del crédito
     * @registrar
     */
    public registrar() {
        var modeloCredito = this.formatearDatos();
        if (this.empresa != '' && this.min >= 0 && this.max >= this.min && this.valorInteres != 0 && modeloCredito != {}) {
            this.$http.post( this.API_path_add, modeloCredito).then(function (respuesta) {
                this.mensajeAccion("Se ha registrado correctamente");
                this.empresa = '';
                this.plazos = '';
                this.valorInteres = null;
                this.min = null;
                this.max = null;
            }.bind(this)).catch(function (err) {
                console.log(err);
                this.mensajeAccion("Hubo un error, intenta nuevamente");
            }.bind(this));
        } else {
            this.mensajeAccion("Los datos no estan correctamente, arreglalos e intenta nuevamente");
        }
    }
}

export default angular.module('plantillaApp.credito', [])
    .config(routes)
    .component('credito', {
        template: require('./credito.html'),
        controller: CreditoComponent,
        controllerAs: 'creditoCtrl'
    })
    .name;