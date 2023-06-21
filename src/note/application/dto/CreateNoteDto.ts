export class CreateNoteDto {
    etiqueta?: string;
    tituloNota?: string;
    fechaCreacion: Date;
    estado?: string;

    constructor( etiqueta?: string, tituloNota?: string, fechaCreacion?: Date, estado?: string) {

        this.etiqueta = etiqueta;
        this.tituloNota = tituloNota;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
    }
}
