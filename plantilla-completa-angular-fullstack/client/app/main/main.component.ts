const angular = require('angular');
const ngRoute = require('angular-route');
import routing from './main.routes';
import Base from "../../components/object/base/Base";

export class MainController extends Base{
  private $location: any;
  /*@ngInject*/
  constructor($rootScope:any, $location:any, Tb:any) {
    super($rootScope,Tb);
    this.$location = $location;
  }

  $onInit() {
    this.setTitle('Créditos');
    this._Tb.showToolbarBurger();
    this._Tb.hideMenuBar();
    this.setToolbarOption();
  }
}

export default angular.module('plantillaApp.main', [
  ngRoute])
    .config(routing)
    .component('main', {
      template: require('./main.html'),
      controller: MainController,
      controllerAs: 'ac'
    })
    .name;
