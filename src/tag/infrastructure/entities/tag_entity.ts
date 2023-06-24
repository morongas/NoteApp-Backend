import { NoteEntity } from "src/note/infrastructure/entities/note_entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

@Entity({name: 'tag'})
export class TagEntity{

    @PrimaryColumn()
    id: string;

    @Column()
    idUsuario: number;

    @Column()
    nombre: string;

    @ManyToMany(type=>NoteEntity, note=>note.tags)
    @JoinTable()
    notes: NoteEntity[]
}