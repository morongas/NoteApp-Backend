import { UserEntity } from "src/user/infrastructure/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { bodyEntity } from "./body_entity";


//PRUEBA 
@Entity({ name: 'note' })
export class NoteEntity {
    
    @PrimaryColumn()
    idNota: string;

    @Column({ nullable: true})
    estadoNota?: string;

    @Column({ nullable: true})
    etiquetaNota?: string;

    @Column()
    fechaNota: Date;

    @Column()
    tituloNota: string;

    @Column({ nullable: true})
    descripcionNota?: string;

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
}

