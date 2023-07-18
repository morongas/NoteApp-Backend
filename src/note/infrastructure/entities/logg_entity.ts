import { Serializable } from "child_process";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";


@Entity({ name: 'Logg' })
export class logg_entity{
    @PrimaryColumn()
    IDLog: string;

    @Column({ nullable: false })
    action: string;
    @Column({ nullable: false })
    result: string;
}