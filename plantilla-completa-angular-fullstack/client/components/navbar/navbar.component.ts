'use strict';
/* eslint no-sync: 0 */
const angular = require('angular');

import Base from '../object/base/Base';
import {ToolbarService} from './toolbar.service';
/**
 * @class Definicion del toolbar
 */
export class NavbarComponent extends Base{

  /**
   * Value for the top field in the
   * navbar header 
   */
  private topField: string;
  /**
   * Value for the bottom field in the
   * navbar headear
   */
  private bottomField: string;
  /**
   * @field $mdSidenav Contenedor del manú lateral
   * @type any
   */
  private $mdSidenav: any;
  /**
   * @field Auth Variable que ayuda con la autenticación el usuario
   * @type any
   */
  private Auth: any;
  /**
   * @field $location Variable que maneja las urls para la navegación de la app
   * @type any
   */
  private $location: any;

  /**
   * @constructor Inicializa todas las variables
   * @param $rootScope
   * @param $window
   * @param $mdSidenav
   * @param $location
   * @param Auth
   */
  constructor($rootScope, $mdSidenav, $location, Auth, Tb) {
    'ngInject';
    super($rootScope, Tb);
    this.$mdSidenav = $mdSidenav;
    this.$location = $location;
    this.Auth = Auth;
  }

  /**
   * Will get from the Auth the user info
   * and will set it in the topField and bottomField
   * to display in the header of the navbar
   */
  // private setUserName(){
  //   var admi = this.Auth.getAdmi();
  //   var user = this.Auth.getUser();
  //   if(admi !== undefined){
  //       this.topField = admi.usuario;
  //       this.bottomField = admi.empresa;
  //   }else if(user !== undefined){
  //       this.topField = user.nombre;
  //       this.bottomField = user.correo;
  //   }else{
  //     this.topField = '';
  //     this.bottomField = '';
  //   }
  // }

  /**
  * Fired when the application is initiated. 
  * Checks user's credential and shows the appropriate view. 
  *
  * @event $onInit
  */
	$onInit(){
    this.setTitle('Créditos');
    // this.setUserName();
    //Asigna el menú correspondiente a la autenticación, si no hay oculta el toolbar bar
		if(this.Auth.isLoggedIn()){
			// this._Tb.showClientNavBar();
      this._Tb.showToolbarBurger();
		// }else if(this.Auth.getAdmi()!==null&&this.Auth.getAdmi()!==undefined){
			// this._Tb.showPersonalNavBar();
      // this._Tb.showToolbarBurger();
		}else{
      this._Tb.hideToolbar();
    }
    this.setToolbarOption();
	}

  /**
   * @function Para abrir el menú lateral
   * @return void
   */
  public isOpenLeft():void{
      return this.$mdSidenav('left').isOpen();
  };

  /**
   * @function funcion que ayuda a cerrar el menú lateral en la vista y contiene un callback
   * @return void
   */
  public toggleLeft():void{
      //if the field for the nav are empty set the values
      // if(this.bottomField == '' || this.topField == ''){
      //   this.setUserName();
      // }
      this.$mdSidenav('left')
        .toggle()
        .then(function () {});
  }

  //Funciones del Menú general
  /**
   * @funcion Funcion que ayuda a eliminar los datos y enviar a la pantalla de inicio de sesión
   * @return void
   */
  public logout():void{
    this.$mdSidenav('left').close();
    this.Auth.logout();
    this._Tb.hideToolbar();
    this.setToolbarOption();
    this.$location.path('/login');
    this.topField = '';
    this.bottomField = '';
  }

  /**
   * @funcion Función que envía al inicio de la pagina
   * @return void
   */
  public inicio():void{
    this.$mdSidenav('left').close();
    this.$location.path('/');
    this.setTitle('Céditos');
    this._Tb.showToolbarBurger();
    this._Tb.hideMenuBar();
    this.setToolbarOption();
  }

  /**
   * @funcion Regresa a una pocición anterior en la pagina
   * @return void
   */
  public onBack():void{
    window.history.back();
  }

  //Funciones del Menú para Administrativo

  /**
   * @funcion Envia al módulo control de cartera y cierra el menú lateral
   * @return void
   */
  public busquedaC():void{
    this.$mdSidenav('left').close();
    this.setTitle('Buscar Créditos');
    this._Tb.showToolbarBurger();
    this._Tb.hideMenuBar();
    this.setToolbarOption();
    this.$location.path('/creditos');
  }

  /**
   * @funcion Closes side bar and change location to the ahorros path for Pe
   * @return void
   */
  public misC():void{
    this.$mdSidenav('left').close();
    this.$location.path('/mis');
    this.setTitle('Mis Créditos');
    this._Tb.showToolbarBurger();
    this._Tb.hideMenuBar();
    this.setToolbarOption();
  }

  /**
   * @funcion Envia a la pantalla del lista de personal y cierra el menú lateral
   * @return void
   */
  public registroC():void{
    this.$mdSidenav('left').close();
    this.$location.path('/registro');
    this.setTitle('Registro Créditos');
    this._Tb.showToolbarBurger();
    this._Tb.hideMenuBar();
    this.setToolbarOption();
  }

  /**
   * @funcion Closes side bar and change location to the aclaraciones path for Pe
   * @return void
   */
  // public aclaracionesPe():void{
  //   this.$mdSidenav('left').close();
  //   this.$location.path('/aclaraciones/pe');
  // }

  /**
   * @funcion Agrega titulo y envía a la pantalla de mapa
   */
  // public goMap():void{
  //   this.$mdSidenav('left').close();
  //   this._$rootScope.doMapa();
  //   this._Tb.showToolbarBurger();
  //   this.setToolbarOption();
  //   this.setTitle('Mapa');
  // }

  //Funciones del Menú para Clientes/Acreditados

  /**
   * @funcion Closes side bar and change location to the aclaraciones path for Cl
   * @return void
   */
  // public aclaracionesCl():void{
  //   this.$mdSidenav('left').close();
  //   this.$location.path('/aclaraciones/cl');
  //   this.setTitle('Mis Aclaraciones');
  //   this._Tb.showToolbarBurger();
  //   this.setToolbarOption();
  // }

  /**
   * @funcion Cierra el menú lateral y envia a la pantalla de estado de cuenta
   * @return void
   */
  // public doEstadoDeCuenta(){
  //   this.$mdSidenav('left').close();
  //   this.$location.path('/reportes/ec');
  //   this.setTitle('Estado de cuenta');
  //   this._Tb.showToolbarBurger();
  //   this.setToolbarOption();
  // }

  // public ahorrosRE():void{
  //   this.$mdSidenav('left').close();
  //   this.$location.path('/ahorros/reportes/reporteide');
  //   this.setTitle('Ahorros');
  //   this.setModeToolbar(ModeToolbar.NORMAL);
  // }

  // public doEstadoDeCuentaPersonal(){
  //   this.$location.path('/reportes/ec/personal');
  //   this.$mdSidenav('left').close();
  //   this.setTitle('Estado de cuenta');
  //   this.setModeToolbar(ModeToolbar.NORMAL);
  // }

  // public clientes():void{
  //   this.$mdSidenav('left').close();
  //   this.$location.path('/general/clientes');
  //   this.setModeToolbar(ModeToolbar.NORMAL);
  // }

  // public tablaSinSolicitud(): void{
  //   this.$mdSidenav('left').close();
  //   this.$location.path('/amortizacion/sinsolicitud');
  //   this.setTitle('Tabla de amortizacion sin solicitud');
  //   this.setModeToolbar(ModeToolbar.NORMAL);
  // }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent,
    controllerAs: 'nav'
  })
  .factory('Tb', ToolbarService)
  .name;