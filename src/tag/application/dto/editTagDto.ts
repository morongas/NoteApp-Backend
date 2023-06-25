import { ApiProperty } from "@nestjs/swagger";
import { NoteEntity } from "src/note/infrastructure/entities/note_entity";

export class editTagDto{
    public id: string;
    public nombre: string;
    public idUsuario: number;
    constructor(id: string, nombre: string, idUsuario: number){
        this.id = id;
        this.nombre = nombre;
        this.idUsuario = idUsuario;
    }
}