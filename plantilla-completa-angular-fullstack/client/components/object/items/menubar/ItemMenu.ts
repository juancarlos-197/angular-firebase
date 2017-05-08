'use strict'

import Item from './Item';

/**
 * @class Clase ItemMenu que contiene toda la información para mostrar los menus
 */
export default class ItemMenu {

    /**
     * String para mostrar el titulo del menú
     * @field _titulo
     * @type string
     */
    private _titulo: string;

    /**
     * Array que contiene todos los elementos del menus
     * @field _arrayItems
     * @type Item
     */
    private _arrayItem: Array<Item>;

    /**
     * Item para agregar al menú
     * @field _item
     * @type Item
     */
    private _item: Item;

    /**
     * Item tiene separador
     * @field _separator
     * @type Boolean
     */
    private _separator: Boolean;

    /**
     * @constructor inicializa el array de Items
     */
    constructor() {
        'ngInject';
        this._arrayItem = new Array<Item>();
        this._titulo = "";
        this._separator = false;
    }

    /**
     * Regresa el titulo
     * @return string
     */
    get titulo(): string {
        return this._titulo;
    }

    /**
     * Regresa los elmentos del menú
     * @return array<Item>
     */
    get items(): Array<Item>{
        return this._arrayItem;
    }

    /**
     * Le asigna el titulo
     * @function titulo
     * @param titulo string
     */
    set titulo(titulo:string) {
        this._titulo = titulo;
    }

    /**
     * Funcion que agrega nuevo item al menú con el nombre que se envía
     * @function addItem
     * @param string
     */
    public addItem(titulo:string):ItemMenu{
        this._item = new Item();
        this._item.titulo = titulo;
        return this;
    }

    /**
     * Funcion que agrega un separador en el menú
     * @function addSeparator
     */
    public addSeparator():ItemMenu{
        this._separator = true;
        return this;
    }

    /**
     * Contruye y agrega el elemento al menú
     * Si no se manda llamar esta función el elemento nunca se agregara al menú
     * @function build
     */
    public build(){
        this._arrayItem.push(this._item);
    }

}