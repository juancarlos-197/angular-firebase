'use strict'

import CookiesBase from '../base/CookiesBase';
/**
 * @class Clase base que ayuda a realizar las funciones bases de cualquier pagina web
 */
export default class TablaBase extends CookiesBase {

    /**
     * Variable que contiene la ruta para realizar la petición
     * @field url
     * @type String
     */
    protected url: String;
    /**
     * Variable que contiene los datos a evnviar para la petición
     * @field json
     * @type any
     */
    protected json: any;
    /**
     * Variable que contiene los datos que regresa la petición
     * @field data
     * @type any
     */
    private data: any;
    /**
     * Variable que contiene el scope del componente
     * @field $scope
     * @type any
     */
    protected _$scope: any;
    /**
     * Funcion para realizar las peticiones mediante http
     * @field $http
     * @type any
     */
    protected _$http: any;
    /**
     * Variable que indica el nombre del array en el resultado
     * @field nameArray 
     */
    protected nameArray: string = '';
    /**
     * Variable que guarda el promise para mostrar el loading en la tabla
     * @field _promise
     * @type any
     */
    public _promise: any;
    /**
     * Variable que guarda el array de elementos a mostrar
     * @field _lista
     * @type any
     */
    public _lista: any = [];
    /**
     * Variable que guarda el array de los elementos de cada pagina
     * @field _lista_temp
     * @type any
     */
    public _lista_temp:any = [];
    /**
     * Variable que guarda el array de elementos
     * @field lista
     * @type any
     */
    public _total: number = 0;
    /**
     * Variable que guarda el array de elementos
     * @field lista
     * @type any
     */
    private isPaginator:boolean = true;
    /**
     * 
     * @field selected
     * @type any
     */
    public _selected: any = [];
    /**
     * Variable que contiene el nombre del campo a ordenar
     * @field order
     * @type String
     */
    public _order: String = '';
    /**
     * Variable que contiene el numero de elementos por pagina
     * @field limit
     * @type number
     */
    public _limit: number = 20;
    /**
     * Variable que contiene el numero de elementos por pagina
     * @field limit
     * @type number
     */
    private oldlimit: number = 20;
    /**
     * Variable que contiene el numero de pagina por default
     * @field page
     * @type number
     */
    public _page: number = 1;
    /**
     * Objeto que tiene la información para las etiquetas de la paginación
     * @field label
     * @type any
     */
    public _label: any = {
        page: 'Página:',
        rowsPerPage: 'Registros por página:',
        of: 'de'
    };
    /**
     * Array donde se guarda el numero de limites por pagina
     * @field limitOption
     * @type Array<any>
     */
    public _limitOption: Array<any> = [20, 60, 100];
    /**
     * Variable que indica si se muestran los link de inicio y fin en la tabla, por default esta desactivado
     * @field boundary true si se muestra, false para ocultarlo
     */
    public _boundary: boolean = false;
    /**
     * Variable que indica si se muestran las lista de paginas, por default lo muestra
     * @field selectedPage true si se muestra, false para ocultarlo
     */
    public _selectedPage: boolean = true;
    /**
     * Variable que indica si se deshabilitan los controles de paginación, por default estan habilitados
     * @field disable true si se muestra, false para ocultarlo
     */
    public _disable: boolean = false;
    /**
     * Variable que indica si se habilita la seleccion, por default estan habilitado
     * @field selection true si se habilita, false se deshabilita
     */
    public _selection: boolean = true;
    /**
     * Variable que indica si se habilita la multi seleccion, por default esta deshabilitado
     * @field selection true si se habilita, false se deshabilita
     */
    public _multiSelection: boolean = false;
    /**
     * Variable que indica el row es seleccionable
     * @field rowSelection true si es seleccionable, false se no, por defaul es seleccionable
     */
    public _rowSelection: boolean = true;
    /**
     * Variable que indica el row completo es seleccionable
     * @field autoSelection true si es seleccionable, false se no, por defaul es seleccionable
     */
    public _autoSelection: boolean = true;
    /**
     * Variable que guarda temporalmente los elementos descargados
     * @field dataSaveTemp
     */
    private dataSaveTemp: Array<any>;
    /**
     * Callback que se llama cuando cambia la pagina o los limites de la paginación
     */
    public _onPage: Function;
    /**
     * Callback que se llama cuando se selecciona un item
     */
    public _onSelect: Function;
    /**
     * Callback que se llama cuando los datos se cargan correctamente
     * @field ready
     */
    public ready: Function = () => null;
    /**
     * Callback que se llama cuando no se cargarón los datos correctamente
     * @field error
     */
    public error: Function = () => null;
    /**
     * Callback que se llama cuando se selecciona un elemento
     * @field onSelected
     */
    public selectF: Function = () => null;

    /**
     * @constructor 
     * @param $rootScope
     * @param $scope
     * @param $cookies
     * @param url La ruta para realizar la petición
     * @param json los datos a enviar
     * @param $http
     * @param nameArray Nombre de la propiedad donde se encuentra el resultado
     */
    constructor($rootScope: any, $scope: any, $cookies: any, url: String, json: any, $http: any, nameArray: string, Tb) {
        'ngInject';
        super($rootScope, $cookies,Tb);
        this._$scope = $scope;
        this.url = url;
        this.json = json;
        this._$http = $http;
        this.nameArray = nameArray;
        this.dataSaveTemp;
        this._$scope.me = this;

        this._onPage = function (page: number, limit: number) {
            $scope.me.update();
        }

        this._onSelect = function(item: any){
            $scope.me.selectF(item);
        }
    }

    $onInit() {
        super.$onInit();
    }

    /**
     * Funcion que actualiza los datos de la tabla cuando se cambia de pagina o de limites
     */
    public update():void{
        //Si los datos no tienen paginador
        if(this.isPaginator){
            if(this._limit === this.oldlimit){
                this._lista = this._lista_temp[this._page-1];
            }else{
                let temp = [];
                for(let i in this._lista_temp){
                    temp = temp.concat(this._lista_temp[i]);
                }
                this.initTemp(temp,this._limit,this._page-1);
                this.oldlimit = this._limit;
            }
        }else{//Si los datos son paginados
            if(this._limit === this.oldlimit){
                if(this.json===undefined || this.json===null){
                    this.json = {};
                }
                this.json.siguiente = ((this._page-1) * this._limit) + 1;
                this.onNext();
            }else{
                this.dataSaveTemp = [];
                if(this.json===undefined || this.json===null){
                        this.json = {};
                }
                this.json.limite = this._limit;
                this.json.siguiente = ((this._page-1) * this._limit) + 1;
                this.oldlimit = this._limit;
                this.onNext();
            }
        }
    }

    /**
     * Funcion que realiza la petición de los datos por primera vez.
     * Esta función es exclusiva para la primer peticion, en las siguientes peticiones si tiene paginación se debe utilizar {@link onNext()} 
     * @fun funcion que se ejecuta cuando se obtienen los elementos
     */
    public on(fun:Function):void{
        this._promise = this._$http.post(this.url,this.json).then(function(respuesta){
            console.log(respuesta.data);
            console.log('Status:' + respuesta.status);
            if(respuesta.data.hasOwnProperty('total')){
                if(this.nameArray==''||this.nameArray==null||this.nameArray==undefined){
                    this._lista = respuesta.data;
                }else{
                    this._lista = respuesta.data[this.nameArray];
                }
                this._setTotal(respuesta.data.total);
                this.isPaginator = false;
            }else{
                if(this.nameArray==''||this.nameArray==null||this.nameArray==undefined){
                    this.initTemp(respuesta.data,20,0);
                }else{
                    this.initTemp(respuesta.data[this.nameArray],20,0);
                }
                this.isPaginator = true;
            }
            fun(respuesta);
        }.bind(this), function errorCallback(response) {
            console.log('Error response');
            if(response.status == 451)
            {
                this.json.error = "No tienes permiso para ver este contenido";
                fun(this.json);
            }
        }.bind(this)).catch(function (err) {
            console.log(err);
            this.error(err);
        }.bind(this));
    }

    /**
     * Funcion que realiza la petición de los datos siguientes o por actualización
     */
    public onNext():void{
        this._lista = [];
        this._promise = this._$http.post(this.url, this.json).then(function (respuesta) {
            this._lista = respuesta.data[this.nameArray];
            this.ready(respuesta);
            // _this.dataSaveTemp[_this._page] = respuesta.data[_this.nameArray];
        }.bind(this)).catch(function (err) {
            console.log(err);
            this.error(err);
        }.bind(this));
    }

    /**
     * Funcion que muestra u oculta los botones de inicio o de fin en la paginación
     * @param boundary true para mostrar, false para occultar
     */
    public _setBotonesIniFin(boundary:boolean):void{
        this._boundary = boundary;
    }

    /**
     * Funcion que muestra u oculta los botones de inicio o de fin en la paginación
     * @param boundary true para mostrar, false para occultar
     */
    public _setSelectedPage(selectedPage:boolean):void{
        this._selectedPage = selectedPage;
    }

    /**
     * Asignación del total de elementos
     * @param total
     */
    public _setTotal(total:number):void{
        this._total = total;
    }

    /**
     * Funcion que muestra u oculta los botones de inicio o de fin en la paginación
     * @param disable true para mostrar, false para occultar
     */
    public _setDisable(disable:boolean):void{
        this._disable = disable;
    }

    /**
     * Funcion que permite la multi seleccion
     * @param multiSelection true para permitir, false para occultar
     */
    public _setMultiSelected(multiSelection:boolean):void{
        this._multiSelection = multiSelection;
    }

    /**
     * Funcion que permite la seleccion del row
     * @param multiSelection true para permitir, false para occultar
     */
    public _setRowSelection(rowSelection:boolean):void{
        this._rowSelection = rowSelection;
    }

    /**
     * Funcion que permite la seleccion del row
     * @param autoSelection true para permitir, false para occultar
     */
    public _setAutoSelection(autoSelection:boolean):void{
        this._autoSelection = autoSelection;
    }

    /**
     * Asigana una funcion como Callback para cuando esten lisos los datos
     * @field ready la funcion
     */
    public setReadyF(ready:Function):void{
        this.ready = ready;
    }

    /**
     * Asigana una funcion como Callback para cuando existe error
     * @field error la funcion
     */
    public setErrorF(error:Function):void{
        this.error = error;
    }

    /**
     * Asigana una funcion como Callback para cuando se selecciona una fila
     * @field select la funcion
     */
    public setSelectF(select:Function):void{
        this.selectF = select;
    }

    /**
     * Funcion que agrega los campos a enviar en la petición
     * @field data el json a enviar
     */
    public setData(data:any):void{
        this.json = data;
    }

    /**
     * Funcion que prepara los datos para la paginación manual
     */
    public initTemp(data:any,tamano:number,page:number):void{
        console.log(data);
        console.log(this.nameArray);
        if(data===undefined||data===null){
            this._lista = [];
            this._setTotal(0);
        }else{
            let total:number = data.length/tamano, ini:number = 0, fin:number = tamano;
            this._lista_temp = [];
            for(let i:number = 0;i<total;i++){
                this._lista_temp[i] = data.slice(ini,fin);
                ini = fin;
                if((fin+tamano)>total){
                    fin += tamano; 
                }else{
                    fin = data.length;
                }
            }
            this._lista = this._lista_temp[page];
            this._setTotal(data.length);
        }
    }

}