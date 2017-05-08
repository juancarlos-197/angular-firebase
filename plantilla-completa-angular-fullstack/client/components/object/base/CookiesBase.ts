'use strict'
import Base from './Base';
/**
 * @class Clase base que ayuda a realizar las funciones bases de cualquier pagina web
 */
export default class CookiesBase extends Base{

    /**
     * @field _$cookies
     */
    private _$cookies: any;

    /**
     * @constructor 
     * @param $rootScope
     * @param $cookies
     */
    constructor($rootScope:any,$cookies:any,Tb){
        'ngInject';
        super($rootScope,Tb);
        this._$cookies = $cookies;
    }

    $onInit(){
        super.$onInit();
    }

    /**
     * Guarda los datos a enviar entre paginas
     * @param data
     * @type any
     */
    public saveDataTemp(data:any){
        this._$cookies.put('temp',data);
    }

    /**
     * Regresa los datos guardados
     */
    public getDataTemp():any{
        return this._$cookies.get('temp');
    }

    /**
     * Guarda los datos a enviar entre paginas
     * @param data es un objeto JSON
     * @type any
     */
    public saveDataJSONTemp(data:any){
        this._$cookies.put('temp',JSON.stringify(data));
    }

    /**
     * Regresa los datos guardados en formato JSON
     */
    public getDataJSONTemp():any{
        try {
            return JSON.parse(this._$cookies.get('temp'));    
        } catch (error) {
            return {};
        }
    }

    /** HTH 17/12/2016 BTX3390
     * Guarda el listado de monedas a enviar entre paginas
     * @param data es un objeto JSON
     * @type any
     */
    public saveDataMonedaJSONTemp(data:any){
        this._$cookies.put('moneda',JSON.stringify(data));
    }

    /** HTH 17/12/2016 BTX3390
     * Regresa el listado de moendas guardado en formato JSON
     */
    public getDataMonedaJSONTemp():any{
        return JSON.parse(this._$cookies.get('moneda'));
    }

    /** HTH 17/12/2016 BTX3390
     * Guarda el listado de instrumentos de ahorro entre paginas
     * @param data es un objeto JSON
     * @type any
     */
    public saveDataInstrumentosJSONTemp(data:any){
        this._$cookies.put('lstInstrumentos',JSON.stringify(data));
    }

    /** HTH 17/12/2016 BTX3390
     * Regresa el listado de instrumentos de ahorro guardado en formato JSON
     */
    public getDataInstrumentosJSONTemp():any{
        return JSON.parse(this._$cookies.get('lstInstrumentos'));
    }

    /** HTH 17/12/2016 BTX3390
     * Guarda el listado de tipo de movimientos a enviar entre paginas
     * @param data es un objeto JSON
     * @type any
     */
    public saveDataTipoMovimientoJSONTemp(data:any){
        this._$cookies.put('tipoMovimiento',JSON.stringify(data));
    }

    /** HTH 17/12/2016 BTX3390
     * Regresa el listado de tipo de movimientos guardado en formato JSON
     */
    public getDataTipoMovimientoJSONTemp():any{
        return JSON.parse(this._$cookies.get('tipoMovimiento'));
    }

    /** HTH 17/12/2016 BTX3390
     * Guarda el listado de aseguradoras a enviar entre paginas
     * @param data es un objeto JSON
     * @type any
     */
    public saveDataAseguradoraJSONTemp(data:any){
        this._$cookies.put('aseguradora',JSON.stringify(data));
    }

    /** HTH 17/12/2016 BTX3390
     * Regresa el listado de aseguradoras guardado en formato JSON
     */
    public getDataAseguradoraJSONTemp():any{
        return JSON.parse(this._$cookies.get('aseguradora'));
    }

}