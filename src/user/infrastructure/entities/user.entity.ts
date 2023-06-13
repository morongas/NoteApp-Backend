import { Column, CreateDateColumn, Entity, getManager, JoinTable, ManyToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn({ type: "uuid" }) 
    id: string;

    @Column({ name: 'nombre_completo', length: 32 }) 
    nombre: string;

    @Column({ name: 'clave', length: 32 }) 
    clave: string;

    @Column({ name: 'usuario', length: 32 }) 
    usuario: number;

    @Column({ name: 'correo', length: 32 }) 
    correo: number;

    @Column({ name: 'f_nacimiento', length: 32 }) 
    f_nacimiento: number;


}
