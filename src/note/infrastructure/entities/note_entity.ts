import { UserEntity } from "src/user/infrastructure/entities/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { bodyEntity } from "./body_entity";
import { TagEntity } from "src/tag/infrastructure/entities/tag_entity";


//PRUEBA 
@Entity({ name: 'note' })
export class NoteEntity {
    
    @PrimaryColumn()
    idNota: string;

    @Column()
    estadoNota: string;

    @Column()
    etiquetaNota: string;

    @Column()
    fechaNota: Date;

    @Column()
    tituloNota?: string;

    @ManyToOne(
        ()=>UserEntity,
        (userEntity)=> userEntity.notes
    )
    user: string;

    @OneToMany(
        () => bodyEntity,
        (bodyEntity)=>bodyEntity.nota
    )
    body: bodyEntity[];

    @ManyToMany(type => TagEntity, tag => tag.notes)
    tags: TagEntity[]
}

