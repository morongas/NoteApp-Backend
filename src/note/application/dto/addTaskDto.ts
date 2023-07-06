import { ApiProperty } from "@nestjs/swagger";

export class addTaskDto{
    @ApiProperty()
    idNota: string;
    @ApiProperty()
    text: string;
    @ApiProperty()
    status: string;
    @ApiProperty()
    fechaCreacion: Date;

    constructor(idNota: string, text: string, status: string, fechaCreacion: Date){
        this.idNota = idNota;
        this.text = text;
        this.status = status;
        this.fechaCreacion = fechaCreacion;
    }
}