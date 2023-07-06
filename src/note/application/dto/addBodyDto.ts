import { ApiProperty } from "@nestjs/swagger";

export class addBodyDto {
    @ApiProperty()
    idNota: string;
    @ApiProperty()
    fecha: Date;
    @ApiProperty()
    text?: string;
    @ApiProperty()
    imagen?: Buffer;
    
    public constructor(idNota,fecha, text?, imagen?) {
        this.idNota = idNota;
        this.fecha=fecha;
        this.text = text;
        this.imagen = imagen;
    }
}