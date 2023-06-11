export class CreateNoteDto {
    idNota: string;
    cuerpoText?: string;
    cuerpoImg?: string;
    etiqueta?: string;
    tituloNota?: string;
    fechaCreacion: Date;
    estado?: string;
}
