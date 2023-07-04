import { ApiProperty } from "@nestjs/swagger";

export class updateBodyDto {
    @ApiProperty()
    idBody: string;
    @ApiProperty()
    text?: string;
    @ApiProperty()
    imagen?: Buffer;
    
    public constructor(idBody, text?, imagen?) {
        this.idBody = idBody;
        this.text = text;
        this.imagen = imagen;
    }
}