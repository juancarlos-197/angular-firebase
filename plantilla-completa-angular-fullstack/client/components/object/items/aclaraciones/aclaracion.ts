export default class Aclaracion{
    private _estado: string;
    private _fregistro: number;
    private _tipo: string;
    private _id: any;
    private _titulo: string;

    constructor(aclaracion: any){
        this._estado = aclaracion.estado;
        this._fregistro = aclaracion.fregistro;
        this._id = aclaracion.id;
        this._tipo = aclaracion.tipo;
        this._titulo = aclaracion.titulo;
    }

    get id(): any{
        return this._id;
    }
    get cdgacl(){
        return this._id.cdgacl;
    }
    get fregistro(): number{
        return this._fregistro;
    }
    get format_fregistro(): string{
        var date = new Date(this._fregistro);
        return date.toLocaleDateString('mx');
    }
    get full_tipo(): string{
        return this._tipo == 'A' ? 'Aclaracion' : 'Comentario';
    }

    get tipo(): string{
        return this._tipo;
    }
    get estado(): string{
        return this._estado;
    }

    get titulo(): string{
        return this._titulo;
    }
}