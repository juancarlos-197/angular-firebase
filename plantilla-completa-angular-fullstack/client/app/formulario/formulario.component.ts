'use strict';

import Base from '../../components/object/base/Base';

export default class FormularioController extends Base{

    public data:any;

    /*@ngInject*/
    constructor($rootScope,$http,Tb) {
        super($rootScope,Tb);

    }

}