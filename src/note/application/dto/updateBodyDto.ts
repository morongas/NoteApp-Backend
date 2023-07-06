import { ApiProperty } from "@nestjs/swagger";

export class updateBodyDto {
    @ApiProperty()
    idBody: string;
    @ApiProperty()
    fecha: Date;
    text?: string;
    @ApiProperty()
    imagen?: Buffer;
    
    public constructor(idBody,fecha,text?, imagen?) {
        this.idBody = idBody;
        this.fecha=fecha;
        this.text = text;
        this.imagen = imagen;
    }
}