import { UserEntity } from "src/user/infrastructure/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";


//PRUEBA 
@Entity({ name: 'note' })
export class NoteEntity {
    
    @PrimaryColumn()
    idNota: string;

    @Column()
    cuerpoNotaText: string;

    @Column()
    cuerpoNotaImg: string;

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
}

