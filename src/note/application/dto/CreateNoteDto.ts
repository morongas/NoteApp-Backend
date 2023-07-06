import { ApiProperty } from "@nestjs/swagger";

export class CreateNoteDto {
    @ApiProperty()
    tituloNota: string;
    @ApiProperty()
    fechaCreacion: Date;
    @ApiProperty()
    estado?: string;
    @ApiProperty()
    descrip?: string;

    constructor(tituloNota: string, fechaCreacion?: Date, estado?: string,desc?: string) {

        this.tituloNota = tituloNota;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
        this.descrip = desc;
    }
}
