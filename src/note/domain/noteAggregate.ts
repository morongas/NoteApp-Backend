import { Either } from "src/generics/Either";
import { IDNota } from "./valueObjects/IDNota";
import { cuerpoNota } from "./valueObjects/cuerpoNota";
import { estadoNota } from "./valueObjects/estadoNota";
import { etiquetaNota } from "./valueObjects/etiquetaNota";
import { fecha } from "./valueObjects/fecha";
import { tituloNota } from "./valueObjects/tituloNota";

export class NoteAggregate{

    private idNota: IDNota;
    private cuerpoNota?: cuerpoNota;
    private etiqueta?: etiquetaNota;
    private tituloNota?: tituloNota;
    private fechaCreacion: fecha;
    private estado?: estadoNota;

    private constructor(idNota: IDNota, fechaCreacion: fecha, etiqueta?: etiquetaNota, titulo?: tituloNota, estado?: estadoNota,
        cuerpoNota?: cuerpoNota) {
        this.idNota = idNota;
        this.cuerpoNota = cuerpoNota;
        this.etiqueta = etiqueta;
        this.tituloNota = titulo;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
        
    }

    static create(fechaC: Date,cuerpoText?: string, cuerpoImg?: string, etiqueta?: string, tituloNot?: string, estado?: string):
         Either<Error, NoteAggregate> {
        let idNota = IDNota.create();
        let fechaCreacion = fecha.create(fechaC);
        let cuerpo = cuerpoNota.create(cuerpoText, cuerpoImg);
        let etiquet = etiquetaNota.create(etiqueta);
        let titulo = tituloNota.create(tituloNot);
        let estadoNote = estadoNota.create(estado);


        if ((fechaCreacion.isLeft()) && (cuerpo.isLeft()) && (etiquet.isLeft()) && (titulo.isLeft()) && (estadoNote.isLeft())) {
            return Either.makeLeft<Error, NoteAggregate>(new Error('No se puede crear una nota sin fecha'));
        }else{
            return Either.makeRight<Error, NoteAggregate>(new NoteAggregate(idNota, fechaCreacion.getRight(), etiquet.getRight(), titulo.getRight(), estadoNote.getRight(), cuerpo.getRight()));
        }

    }


    //GETTERS
    public getid(): IDNota {
        return this.idNota;
    }

    public getcuerpoNota(): cuerpoNota {
        return this.cuerpoNota;
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

}
