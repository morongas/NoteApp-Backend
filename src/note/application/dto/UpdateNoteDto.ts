export class UpdateNoteDto {
    idNota?: string;
    etiqueta?: string;
    tituloNota?: string;
    fechaCreacion: Date;
    estado?: string;

    constructor(idNota?:string, etiqueta?: string, tituloNota?: string, fechaCreacion?: Date, estado?: string) {
        this.idNota = idNota;
        this.etiqueta = etiqueta;
        this.tituloNota = tituloNota;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
    }
}