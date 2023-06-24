import { ApiProperty } from "@nestjs/swagger";
import { NoteEntity } from "src/note/infrastructure/entities/note_entity";

export class createTagDto{
    public nombre: string;
    public idUsuario: number;
    constructor(nombre: string, idUsuario: number){
        this.nombre = nombre;
        this.idUsuario = idUsuario;
    }
}