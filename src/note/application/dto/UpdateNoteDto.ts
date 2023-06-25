export class UpdateNoteDto {
    idNota?: string;
    etiqueta?: string;
    tituloNota: string;
    fechaCreacion: Date;
    estado?: string;
    descrip?: string;

    constructor(tituloNota: string, idNota?:string, etiqueta?: string, fechaCreacion?: Date, estado?: string, desc?: string) {
        this.idNota = idNota;
        this.etiqueta = etiqueta;
        this.tituloNota = tituloNota;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
        this.descrip = desc;
    }
}