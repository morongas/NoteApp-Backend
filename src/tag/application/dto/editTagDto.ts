import { ApiProperty } from "@nestjs/swagger";
import { NoteEntity } from "src/note/infrastructure/entities/note_entity";

export class editTagDto{
    public id: string;
    public nombre: string;
    public idUsuario: number;
    public notas: string[]
    constructor(id: string, nombre: string, idUsuario: number, notas: string[]){
        this.id = id;
        this.nombre = nombre;
        this.idUsuario = idUsuario;
        this.notas = notas;
    }
}