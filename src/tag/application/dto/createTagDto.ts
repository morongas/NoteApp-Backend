import { NoteEntity } from "src/note/infrastructure/entities/note_entity";

export class createTagDto{
    constructor(
        public id: string,
        public nombre: string,
        public idUsuario: number,
        public notes: NoteEntity[]
        ){}
}