import { ApiProperty } from "@nestjs/swagger";

export class CreateNoteDto {
    
    @ApiProperty()
    tituloNota: string;
    @ApiProperty()
    fechaCreacion: Date;
    @ApiProperty()
    latitud: number;
    @ApiProperty()
    longitud: number;
    @ApiProperty()
    descripcionGPS: string;
    @ApiProperty()
    estado?: string;
    @ApiProperty()
    descrip?: string;
    @ApiProperty()
    idUsuario?: number;

    constructor(tituloNota: string, fechaCreacion?: Date, latitud?: number, longitud?:number, descripcionGPS?: string, estado?: string,desc?: string, idUsuario?: number) {
        this.tituloNota = tituloNota;
        this.fechaCreacion = fechaCreacion;
        this.latitud = latitud;
        this.longitud = longitud;
        this.descripcionGPS = descripcionGPS;
        this.estado = estado;
        this.descrip = desc;
        this.idUsuario = idUsuario;
    }
}
