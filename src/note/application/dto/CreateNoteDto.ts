export class CreateNoteDto {
    tituloNota: string;
    fechaCreacion: Date;
    estado?: string;
    descrip?: string;

    constructor(tituloNota: string, fechaCreacion?: Date, estado?: string,desc?: string) {

        this.tituloNota = tituloNota;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
        this.descrip = desc;
    }
}
