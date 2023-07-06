import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { NoteEntity } from "./note_entity";

@Entity({ name: 'taskNote' })
export class taskEntity{
    @PrimaryColumn()
    IDtask: string;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    fechaCreacion: Date;
    
    @Column({ nullable: false })
    status: string;

    @ManyToOne(
        () => NoteEntity,
        (NoteEntity) => NoteEntity.idNota, {
            onDelete: 'CASCADE',
        }
    )
    nota: string;
}