'use strict'

import ItemMenu from './ItemMenu';

/**
 * @class Clase Menu que contiene toda la información para mostrar los menus
 */
export default class Menu {

    /**
     * Array que contiene todos los elementos del menú
     * @field arrayMenu
     */
    private arrayMenu: any;
    /**
     * 
     */
    private itemMenu: ItemMenu;

    constructor() {
        'ngInject';
        this.arrayMenu = [];
    }

    public addTituloMenu(titulo: string): Menu {
        this.itemMenu = new ItemMenu();
        this.itemMenu.titulo = titulo;
        return this;
    }

    public addItemMenu(titulo: string): Menu {
        this.itemMenu.addItem(titulo).build();
        return this;
    }

    public addSeparatorMenu():Menu{
        this.itemMenu.addSeparator();
        return this;
    }

    public build(): Menu {
        this.arrayMenu.push(this.itemMenu);
        return this;
    }

    public get menu() {
        return this.arrayMenu;
    }

}