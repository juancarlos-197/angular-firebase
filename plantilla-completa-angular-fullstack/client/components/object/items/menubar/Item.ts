'use strict'

/**
 * @class Clase Item que contiene la información de cada elemento del menú
 */
export default class Item {

    /**
     * String para mostrar el titulo del menú
     * @field titulo
     * @type string
     */
    private _titulo: string;

    constructor() {
        'ngInject';
    }

    /**
     * Regresa el titulo
     * @return string
     */
    get titulo(): string {
        return this._titulo;
    }

    /**
     * Le asigna el titulo
     * @field titulo string
     */
    set titulo(titulo:string) {
        this._titulo = titulo;
    }

}
