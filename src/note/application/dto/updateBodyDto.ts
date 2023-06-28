export class updateBodyDto {
    idBody: string;
    text?: string;
    imagen?: Buffer;
    
    public constructor(idBody, text?, imagen?) {
        this.idBody = idBody;
        this.text = text;
        this.imagen = imagen;
    }
}