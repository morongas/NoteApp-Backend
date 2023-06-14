import { NoteEntity } from "src/note/infrastructure/entities/note_entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryColumn() 
    id: string;

    @Column() 
    nombre: string;

    @Column() 
    clave: string;

    @Column() 
    usuario: string;

    @Column() 
    correo: string;

    @Column() 
    f_nacimiento: string;

    @OneToMany(
        () =>NoteEntity,
        (noteEntity) => noteEntity.user
    )
    notes: NoteEntity[];


}
