export class addBodyDto {
    idNota: string;
    text?: string;
    imagen?: Buffer;
    
    public constructor(idNota, text?, imagen?) {
        this.idNota = idNota;
        this.text = text;
        this.imagen = imagen;
    }
}