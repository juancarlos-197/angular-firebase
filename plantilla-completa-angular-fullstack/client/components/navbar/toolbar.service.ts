'use strict';

export function ToolbarService() {
  'ngInject';
  /**
   * Variable que nos ayuda con el ToolBar
   */
  let toolbar:number = 0;
  /**
   * Variable que nos ayuda con las opciones de de navegación del toolbar
   */
  let icon:number = 101;
  /**
   * Variable que nos ayuda con los elementos de tollbar
   */
  let menuBar:number = 0;
  /**
   * Variable que nos ayuda con el tipo de menú a mostrar
   */
  let navBar:string = 'pe';
  /**
   * Variable que nos ayuda con el módulo a mostrar en el menú de barra
   */
  let modulo:number= 0;
  
  let Tb = {
    /**
     * Ocultar el toolbar
     */
    hideToolbar():void {
      toolbar = 0;
    },

    /**
     * Muestra el toolbar con menú Hamburguesa
     */
    showToolbarBurger():void {
      toolbar = 1;
    },

    /**
     * Muestra el toolbar con flecha de regreso
     */
    showToolbarRegreso():void {
      toolbar = 2;
    },

    /**
     * Regresa el tipo de toolbar
     */
    getToolbar():number {
      return toolbar;
    },
//-----------------------------------------------------------------------------
    /**
     * Oculta los iconos menú del toolbar
     */
    hideIconToolbar():void {
      icon = 101;
    },

    /**
     * Muestra opciones para mapa
     */
    showIconToolbarMap():void {
      icon = 102;
    },

    /**
     * Muestra opciones para refrescar
     */
    showIconToolbarRefresh():void {
      icon = 103;
    },

    /**
     * Muestra opciones para refrescar y terminar
     */
    showIconToolbarRefreshEnd():void {
      icon = 104;
    },

    /**
     * Regresa las opciones a mostrar en el toolbar
     */
    getIconToolbar():number {
      return icon;
    },
//-----------------------------------------------------------------------------
    /**
     * Oculta el menú de barra
     */
    hideMenuBar():void {
      menuBar = 0;
    },

    /**
     * Muestra el menú de barra
     */
    showMenuBar():void {
      menuBar = 1;
    },

    /**
     * Regresa el estatus del Menu de Barra
     */
    getMenuBar():number {
      return menuBar;
    },
//-----------------------------------------------------------------------------
    /**
     * Mostrar las opciones de personal para el menú
     */
    showPersonalNavBar():void {
      navBar = 'pe';
    },

    /**
     * Mostrar las opciones de cliente para el menú
     */
    showClientNavBar():void {
      navBar = 'cl';
    },

    /**
     * Regresa el tipo de nav bar a mostrar
     */
    getNavBar():string {
      return navBar;
    },
//-----------------------------------------------------------------------------
    /**
     * Modulo del menú de barra
     */
    menuBarCC():void {
      modulo = 1;
    },

    /**
     * Muestra el menú de barra
     */
    menuBarAhorro():void {
      modulo = 2;
    },

    /**
     * Se obtiene el módulo a mostrar en el menú de barra
     */
    getModulMenuBar():number {
      return modulo;
    },
//-----------------------------------------------------------------------------
    /**
     * Imprimir los valores de este servicio
     */
    toString():string {
      return "Toolbar: "+toolbar+", Icon:"+icon+", MenuBar:"+menuBar+", NavBar:"+navBar+", Modulo:"+modulo ;
    }
  };

  return Tb;
}
