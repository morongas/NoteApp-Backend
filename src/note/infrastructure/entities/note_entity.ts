import { UserEntity } from "src/user/infrastructure/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { bodyEntity } from "./body_entity";
import { TagEntity } from "src/tag/infrastructure/entities/tag_entity";
import { taskEntity } from "./task_entity";


//PRUEBA 
@Entity({ name: 'note' })
export class NoteEntity {
    
    @PrimaryColumn()
    idNota: string;

    @Column({ nullable: true})
    estadoNota?: string;

    @Column()
    fechaNota: Date;

    @Column()
    latitud: number;

    @Column()
    longitud: number;

    @Column({ nullable: true})
    descripcionGPS: string;

    @Column()
    tituloNota: string;

    @Column({ nullable: true})
    descripcionNota?: string;

    @ManyToOne(
        ()=>UserEntity,
        (userEntity)=> userEntity.notes
    )
    user: UserEntity;

    @OneToMany(
        () => bodyEntity,
        (bodyEntity)=>bodyEntity.nota,{
            cascade: true,
        }
    )
    body: bodyEntity[];
    
    @OneToMany(
        () => taskEntity,
        (taskEntity)=>taskEntity.nota,{
            cascade: true,
        }
    )
    task: taskEntity[];
    
    @ManyToMany(()=>TagEntity, (etiqueta)=>etiqueta.notas)
    etiquetas?: TagEntity[]
}

