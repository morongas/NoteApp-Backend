import { ApiProperty } from "@nestjs/swagger";

export class updateBodyDto {
    @ApiProperty()
    idBody: string;
    @ApiProperty()
    fecha: Date;
    text?: string;
    @ApiProperty()
    imagen?: Buffer;
    @ApiProperty()
    ocr?: boolean;
    
    public constructor(idBody,fecha,ocr?,text?, imagen?) {
        this.idBody = idBody;
        this.fecha=fecha;
        this.text = text;
        this.imagen = imagen;
        this.ocr=ocr;
    }
}