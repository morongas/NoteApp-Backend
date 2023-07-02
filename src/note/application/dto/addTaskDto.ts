export class addTaskDto{
    idNota: string;
    text: string;
    status: string;
    fechaCreacion: Date;

    constructor(idNota: string, text: string, status: string, fechaCreacion: Date){
        this.idNota = idNota;
        this.text = text;
        this.status = status;
        this.fechaCreacion = fechaCreacion;
    }
}