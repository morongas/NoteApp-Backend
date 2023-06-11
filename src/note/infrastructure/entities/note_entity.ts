import { cuerpoNota } from "src/note/domain/valueObjects/cuerpoNota";
import { estadoNota } from "src/note/domain/valueObjects/estadoNota";
import { etiquetaNota } from "src/note/domain/valueObjects/etiquetaNota";
import { fecha } from "src/note/domain/valueObjects/fecha";
import { tituloNota } from "src/note/domain/valueObjects/tituloNota";
import { Column, Entity, PrimaryColumn } from "typeorm";


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
}

