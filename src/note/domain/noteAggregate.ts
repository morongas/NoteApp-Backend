import { Either } from "src/generics/Either";
import { IDNota } from "./valueObjects/IDNota";
import { estadoNota } from "./valueObjects/estadoNota";
import { etiquetaNota } from "./valueObjects/etiquetaNota";
import { fecha } from "./valueObjects/fecha";
import { tituloNota } from "./valueObjects/tituloNota";
import { body } from "./entities/body";

export class NoteAggregate{

    private idNota: IDNota;
    private etiqueta?: etiquetaNota;
    private tituloNota?: tituloNota;
    private fechaCreacion: fecha;
    private estado?: estadoNota;
    private body?: body[] = [];

    private constructor(idNota: IDNota, fechaCreacion: fecha, etiqueta?: etiquetaNota, titulo?: tituloNota, estado?: estadoNota) {
        this.idNota = idNota;
        this.etiqueta = etiqueta;
        this.tituloNota = titulo;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
        
    }

 
    static create(fechaC: Date, etiqueta?: string, tituloNot?: string, estado?: string, id?: string):
         Either<Error, NoteAggregate> {
        
        let idNota: IDNota;
        if(id === undefined){
            idNota = IDNota.create();
        }else{
            idNota = IDNota.create(id);
        }
        let fechaCreacion = fecha.create(fechaC);
        let etiquet = etiquetaNota.create(etiqueta);
        let titulo = tituloNota.create(tituloNot);
        let estadoNote = estadoNota.create(estado);


        if ((fechaCreacion.isLeft()) && (etiquet.isLeft()) && (titulo.isLeft()) && (estadoNote.isLeft())) {
            return Either.makeLeft<Error, NoteAggregate>(new Error('No se puede crear una nota sin fecha'));
        }else{
            return Either.makeRight<Error, NoteAggregate>(new NoteAggregate(idNota, fechaCreacion.getRight(), etiquet.getRight(), titulo.getRight(), estadoNote.getRight()));
        }

    }

    //GETTERS
    public getid(): IDNota {
        return this.idNota;
    }


    public getetiquetaNota(): etiquetaNota {
        return this.etiqueta;
    }

    public gettituloNota(): tituloNota {
        return this.tituloNota;
    }

    public getfechaNota(): fecha {
        return this.fechaCreacion;
    }

    public getestadoNota(): estadoNota {
        return this.estado;
    }

    //SETTERS
    public setbodyNota(body: body){
        this.body.push(body);
    }
}
