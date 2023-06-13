export class UpdateNoteDto {
    cuerpoText?: string;
    cuerpoImg?: string;
    etiqueta?: string;
    tituloNota?: string;
    fechaCreacion: Date;
    estado?: string;

    constructor(cuerpoText?: string, cuerpoImg?: string, etiqueta?: string, tituloNota?: string, fechaCreacion?: Date, estado?: string) {
        this.cuerpoText = cuerpoText;
        this.cuerpoImg = cuerpoImg;
        this.etiqueta = etiqueta;
        this.tituloNota = tituloNota;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
    }
}