import { NoteEntity } from "src/note/infrastructure/entities/note_entity";
import { UserEntity } from "src/user/infrastructure/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({name: 'tag'})
export class TagEntity{

    @PrimaryColumn()
    id: string;

    @ManyToOne(
        ()=>UserEntity,
        (userEntity)=> userEntity.tags
    )
    idUsuario: string;
    
    @Column()
    nombre: string;

    @ManyToMany(()=>NoteEntity, (note)=>note.etiquetas)
    @JoinTable({name: 'tags_notas',
    joinColumn: {name: 'tag_id'},
    inverseJoinColumn: {name: 'note_id'}})
    notas?: NoteEntity[]

}