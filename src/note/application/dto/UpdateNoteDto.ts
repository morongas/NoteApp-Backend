export class UpdateNoteDto {
    idNota?: string;
    tituloNota: string;
    fechaCreacion: Date;
    estado?: string;
    descrip?: string;

    constructor(tituloNota: string, idNota?:string, fechaCreacion?: Date, estado?: string, desc?: string) {
        this.idNota = idNota;
        this.tituloNota = tituloNota;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
        this.descrip = desc;
    }
}