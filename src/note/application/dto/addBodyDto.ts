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
    @ApiProperty()
    ocr: boolean;
    
    public constructor(idNota,fecha,ocr, text?, imagen?) {
        this.idNota = idNota;
        this.fecha=fecha;
        this.text = text;
        this.imagen = imagen;
        this.ocr=ocr;
    }
}