export class UpdateNoteDto {
    idNota?: string;
    cuerpoText?: string;
    cuerpoImg?: string;
    etiqueta?: string;
    tituloNota?: string;
    fechaCreacion: Date;
    estado?: string;

    constructor(idNota?:string, cuerpoText?: string, cuerpoImg?: string, etiqueta?: string, tituloNota?: string, fechaCreacion?: Date, estado?: string) {
        this.idNota = idNota;
        this.cuerpoText = cuerpoText;
        this.cuerpoImg = cuerpoImg;
        this.etiqueta = etiqueta;
        this.tituloNota = tituloNota;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
    }
}