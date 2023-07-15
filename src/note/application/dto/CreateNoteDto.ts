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
    @ApiProperty()
    idUsuario?: number;

    constructor(tituloNota: string, fechaCreacion?: Date, estado?: string,desc?: string, idUsuario?: number) {
        this.tituloNota = tituloNota;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
        this.descrip = desc;
        this.idUsuario = idUsuario;
    }
}
