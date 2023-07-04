import { NoteEntity } from "src/note/infrastructure/entities/note_entity";
import { TagEntity } from "src/tag/infrastructure/entities/tag_entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'user' })
export class UserEntity {
    @PrimaryColumn() 
    id?: number;

    @Column() 
    primer_nombre: string;

    @Column()
    segundo_nombre: string;

    @Column()
    nombre_completo: string

    @Column() 
    usuario: string;

    @Column() 
    clave: string;

    @Column() 
    correo: string;

    @Column() 
    fecha_nacimiento: Date;

    @Column()
    fecha_suscripcion: Date;

    @Column()
    telefono: string;

    @OneToMany(
        () =>TagEntity,
        (tagEntity) => tagEntity.idUsuario
    )
    tags?: TagEntity[];

    @OneToMany(
        () =>NoteEntity,
        (noteEntity) => noteEntity.user
    )
    notes?: NoteEntity[];

    

}
