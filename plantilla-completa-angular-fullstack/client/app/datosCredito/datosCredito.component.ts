'use strict';

const angular = require('angular');
const ngRoute = require('angular-route')

import routes from './datosCredito.routes';
import CookiesBase from '../../components/object/base/CookiesBase';

export class datosCreditoComponent extends CookiesBase {

    public creditoSeleccionado: any;
    public datos: any;
    private $http: any;
    private confirmacion: string;
    private errores: string;
    private plazos: Array<string>;

    private mensualidad: string;
    private totalCredito: number;
    private hideButton:boolean = true; 
    private solicitudForm:any;


    constructor($rootScope, $cookies, $http, Tb) {
        super($rootScope, $cookies, Tb);
        this.$http = $http;
        this.mensualidad = "(Elija las opciones de su solicitud y haga click en calcular para observar sus mensualidades.)";
        this.totalCredito = 0;
    }
    
    $onInit() {
        super.$onInit();
        this.setTitle("Solicitud de crédito");
        this._Tb.showToolbarRegreso();
        this._Tb.hideMenuBar();
        this.setToolbarOption();
        this.creditoSeleccionado = this.getDataJSONTemp();
    }
    /**
     * var intanu = mon*int*plazo/12
     * var total = mon + intanu;
     * var men = total/plazo;
     */

    public calcularMensualidad(): void {
        if (this.validarSolicitud()) {
            var intanu = this.datos.monto * this.creditoSeleccionado.interes * this.datos.plazo / 12
            var total = this.datos.monto + intanu;
            this.mensualidad = '' + (total / this.datos.plazo);
            this.totalCredito = this.datos.plazo * parseInt(this.mensualidad);
        }

    }

    private validarSolicitud(): boolean {
        this.errores = "";

        if (this.datos.plazo == undefined || this.datos.monto == undefined) {
            this.errores = "Debes seleccionar un plazo y haber digitado el monto de tu crédito."
            return false;
        }
        if (this.datos.monto < this.creditoSeleccionado.min || this.datos.monto > this.creditoSeleccionado.max) {
            this.errores = "Monto fuera de rangos, por favor digite nuevamente. Recuerde: Monto mínimo:"+this.creditoSeleccionado.min+" - Monto máximo:"+this.creditoSeleccionado.max;
            return false;
        }

        return true;
    }

    public enviarDatos(): void {
        if (this.validarSolicitud() && this.solicitudForm.$valid) {
            this.$http({
                method: 'POST',
                data: {
                    monto: this.datos.monto,
                    plazo: this.datos.plazo,
                    interes: this.creditoSeleccionado.interes,
                    direccion: this.datos.direccion,
                    telefono: this.datos.telefono,
                    empresa: this.creditoSeleccionado.empresa
                },
                url: '/api/firebase/agregarSolicitud'
            }).then(function successCallback(res) {
                this.confirmacion = "¡Su solicitud ha sido registrada exitosamente!";
                this.hideButton = false;
            }.bind(this), function errorCallback(error) {
                this.confirmacion = error.message;
            }.bind(this));
        }
    }

}

export default angular.module('plantillaApp.datosCredito', [
    ngRoute
])
    .config(routes)
    .component('datosCredito', {
        template: require('./datosCredito.html'),
        controller: datosCreditoComponent,
        controllerAs: 'dtc'
    }).name;