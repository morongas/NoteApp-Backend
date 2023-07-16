import { NoteEntity } from "src/note/infrastructure/entities/note_entity";
import { TagEntity } from "src/tag/infrastructure/entities/tag_entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn() 
    id: number;

    @Column({ unique: true }) 
    usuario: string;

    @Column() 
    clave: string;

    @Column() 
    correo: string;

    @Column() 
    suscripcion: string;

    @Column() 
    primer_nombre: string;

    @Column()
    segundo_nombre: string;

    @Column()
    nombre_completo: string

    @Column() 
    fecha_nacimiento: Date;

    @Column()
    fecha_suscripcion: Date;

    @Column()
    telefono: string;

    @OneToMany(
        () =>TagEntity,
        (tagEntity) => tagEntity.idUsuario,{
            cascade: true,
        } 
    )
    tags?: TagEntity[];

    @OneToMany(
        () =>NoteEntity,
        (noteEntity) => noteEntity.user,{
            cascade: true,
        }
    )
    notes?: NoteEntity[];

    

}
