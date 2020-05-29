

export class ListaItem {
    desc: string;
    completado: boolean;

    constructor(descrip: string){
        this.desc = descrip;
        this.completado = false;
    }
}