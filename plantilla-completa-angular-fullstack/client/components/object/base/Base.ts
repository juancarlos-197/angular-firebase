'use strict'
/**
 * @class Clase base que ayuda a realizar las funciones bases de cualquier pagina web
 */
export default class Base{

    /**
     * @field _$rootScope
     */
    public _$rootScope: any;
    /**
     * @field _Tb que tiene la información del Toolbar
     */
    public _Tb: any;

    /**
     * @constructor 
     * @param _$rootScope
     */
    constructor($rootScope:any, Tb:any){
        'ngInject';
        this._$rootScope = $rootScope;
        this._$rootScope.show = 0;
        this._Tb = Tb;
    }

    $onInit(){
        // this.setToolbarOption();
    }

    public setToolbarOption(){
        this._$rootScope.show = this._Tb.getToolbar();
        this._$rootScope.menut = this._Tb.getIconToolbar();
        this._$rootScope.showmenu = this._Tb.getMenuBar();
        this._$rootScope.menu = this._Tb.getNavBar();
        this._$rootScope.typemenubar = this._Tb.getModulMenuBar();
    }

    /**
     * Agrega el titulo al toolbar
     * @param title
     * @type String
     */
    public setTitle(title:String):void{
        this._$rootScope.title = title;
    }

}
