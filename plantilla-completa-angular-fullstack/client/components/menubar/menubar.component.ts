'use strict';
/* eslint no-sync: 0 */
const angular = require('angular');

import Base from '../object/base/Base';
import filter from './menubar.filter';
import config from './menubar.config';
import Menu from '../object/items/menubar/Menu';
import ItemMenu from '../object/items/menubar/ItemMenu';
/**
 * @class Definicion del toolbar
 */
export class MenubarComponent extends Base {

    public settings:any;
    public $location:any;

    /**
   * @constructor Inicializa todas las variables
   * @param $rootScope
   */
    constructor($rootScope:any, $location, Tb:any) {
        'ngInject';
        super($rootScope, Tb);
        this.$location = $location;
        this.settings = {
            printLayout: true,
            showRuler: true,
            showSpellingSuggestions: true,
            presentationMode: 'edit'
        };
    }

    /**
     * Funcion que realiza la accion de click en cada elemento del menu de Control de cartera
     */
    public clickActionCC(name:string, ev:any):void {
        switch(name) {
            case 'cver'://Clientes
                this.$location.path('/general/clientes');
                break;
            case 'ctcc'://Tabla de amortización con crédito
                
                break;
            case 'ctcs'://Tabla de amortización con solicitud
                
                break;
            case 'ctss'://Tabla de amortización sin solicitud
                this.$location.path('/amortizacion/sinsolicitud');
                break;
            case 'cec'://Estado de cuenta
                this.$location.path('/reportes/ec/personal');
                break;
        }
    }

    /**
     * Funcion que realiza la accion de click en cada elemento del menu de Ahorro
     */
    public clickActionAhorros(name:string, ev:any):void {
        switch(name) {
            case 'cesq'://Catalogo de Esquema de tasa de interés
                this.$location.path('/ahorros/catalogos/esquema');
                break;
            case 'cpro'://Catalogo de Productos de ahorro
                this.$location.path('/ahorros/catalogos/productos');
                break;
            case 'osol'://Operacion Solicitud de cuentas de ahorro
                this.$location.path('/ahorros/operacion/solicitud');
                break;
            case 'ride'://Reporte de IDE
                this.$location.path('/ahorros/reportes/reporteide');
                break;
            case 'rctas'://Reporte de cuentas de ahorro
                this.$location.path('/ahorros/reportes/reportecuentasahorro');
                break;
        }
    }

}

export default angular.module('directives.menubar', [])
    .config(config)
    .filter('keyboardShortcut', filter)
    .component('menubar', {
        template: require('./menubar.html'),
        controller: MenubarComponent,
        controllerAs: 'mp'
    })
    .name;