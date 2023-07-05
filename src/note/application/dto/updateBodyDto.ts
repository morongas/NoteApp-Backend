export class updateBodyDto {
    idBody: string;
    fecha: Date;
    text?: string;
    imagen?: Buffer;
    
    public constructor(idBody,fecha,text?, imagen?) {
        this.idBody = idBody;
        this.fecha=fecha;
        this.text = text;
        this.imagen = imagen;
    }
}