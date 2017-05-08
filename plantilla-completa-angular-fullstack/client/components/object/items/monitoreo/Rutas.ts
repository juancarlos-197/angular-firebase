'use strict'

/**
 * @class Clase Rutas que va a tener los datos de las rutas para el monitoreo
 */
export default class Rutas {

    /**
     * Variable que contiene el detalle del monitoreo que recibe al hacer la petición
     * @field detalleMonitoreo
     * @type any
     */
    public detalleMonitoreo: any;
    
    constructor(detalleMonitoreo:any){
        'ngInject';
        this.detalleMonitoreo = detalleMonitoreo;
    }


}
