import { ApiProperty } from "@nestjs/swagger";

export class UpdateNoteDto {
    @ApiProperty()
    idNota?: string;
    @ApiProperty()
    tituloNota: string;
    @ApiProperty()
    fechaCreacion: Date;
    @ApiProperty()
    estado?: string;
    @ApiProperty()
    descrip?: string;

    constructor(tituloNota: string, idNota?:string, fechaCreacion?: Date,estado?: string, desc?: string) {
        this.idNota = idNota;
        this.tituloNota = tituloNota;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
        this.descrip = desc;
    }
}