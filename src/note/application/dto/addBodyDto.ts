export class addBodyDto {
    idNota: string;
    fecha: Date;
    text?: string;
    imagen?: Buffer;
    
    public constructor(idNota,fecha, text?, imagen?) {
        this.idNota = idNota;
        this.fecha=fecha;
        this.text = text;
        this.imagen = imagen;
    }
}