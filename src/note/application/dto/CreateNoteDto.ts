export class CreateNoteDto {
    etiqueta?: string;
    tituloNota: string;
    fechaCreacion: Date;
    estado?: string;
    descrip?: string;

    constructor(tituloNota: string, etiqueta?: string,fechaCreacion?: Date, estado?: string,desc?: string) {

        this.etiqueta = etiqueta;
        this.tituloNota = tituloNota;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
        this.descrip = desc;
    }
}
