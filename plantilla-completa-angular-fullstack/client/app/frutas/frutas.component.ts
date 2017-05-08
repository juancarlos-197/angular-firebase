'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './frutas.routes';

import Base from '../../components/object/base/Base';

export class FrutasComponent extends Base{
  /**
   * @type String
   * @name message
   */
  public message:string;

  public data:Array<any>;

  private $http:any;
  /*@ngInject*/
  constructor($rootScope,$http,Tb) {
    super($rootScope,Tb);
    this.message = '<br>Hola mundo';
    this.$http = $http;
  }

  $onInit(){
    super.$onInit();
    this.setTitle("Hola Mundo");
    this._Tb.showToolbarRegreso();
    this._Tb.hideMenuBar();
    this.setToolbarOption();

  }

  public getCredit():void{
    this.$http.get('/api/firebase/creditos')
    .then(function(res){
        this.data = res.data;
    }.bind(this))
    .cath(function(error){
        this.data = error.message;
    }.bind(this));
  }
}

export default angular.module('plantillaApp.frutas', [ngRoute])
  .config(routes)
  .component('frutas', {
    template: require('./frutas.html'),
    controller: FrutasComponent,
    controllerAs: 'frutasCtrl'
  })
  .name;
