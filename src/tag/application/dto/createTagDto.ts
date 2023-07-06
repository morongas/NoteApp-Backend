import { ApiProperty,ApiBody } from "@nestjs/swagger";
import { NoteEntity } from "src/note/infrastructure/entities/note_entity";

export class createTagDto{
    @ApiProperty()
    public nombre: string;
    @ApiProperty()
    public idUsuario: number;
    constructor(nombre: string, idUsuario: number, id?: string){
        this.nombre = nombre;
        this.idUsuario = idUsuario;
    }
}