import { ApiProperty } from "@nestjs/swagger";

export class addBodyDto {
    @ApiProperty()
    idNota: string;
    @ApiProperty()
    text?: string;
    @ApiProperty()
    imagen?: Buffer;
    
    public constructor(idNota, text?, imagen?) {
        this.idNota = idNota;
        this.text = text;
        this.imagen = imagen;
    }
}