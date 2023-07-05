import { UserEntity } from "src/user/infrastructure/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { NoteEntity } from "./note_entity";


//PRUEBA 
@Entity({ name: 'bodyNote' })
export class bodyEntity {

    @PrimaryColumn()
    IDbody: string;

    @Column({nullable: true})
    text: string;

    @Column({ type: 'bytea', nullable: true })
    imagen?: Buffer;

    @Column({ nullable: false })
    fechaBody: Date;

    @ManyToOne(
        () => NoteEntity,
        (NoteEntity) => NoteEntity.idNota
    )
    nota: string;
}
