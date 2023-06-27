import { Either } from "src/generics/Either";
import { IDNota } from "./valueObjects/IDNota";
import { estadoNota } from "./valueObjects/estadoNota";
import { fecha } from "./valueObjects/fecha";
import { tituloNota } from "./valueObjects/tituloNota";
import { body } from "./entities/body";
import { descripcionNota } from "./valueObjects/descripcionNota";

export class NoteAggregate{

    private idNota: IDNota;
    private tituloNota: tituloNota;
    private fechaCreacion: fecha;
    private estado?: estadoNota;
    private descripcion?: descripcionNota;
    private body?: body[] = [];

    private constructor(idNota: IDNota, fechaCreacion: fecha,titulo?: tituloNota, estado?: estadoNota, descrip?: descripcionNota) {
        this.idNota = idNota;
        this.tituloNota = titulo;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
        this.descripcion = descrip;
        
    }

 
    static create(tituloNot: string, fechaC: Date, estado?: string, descrip?: string,id?: string):
         Either<Error, NoteAggregate> {
        
        let idNota: IDNota;
        if(id === undefined){
            idNota = IDNota.create();
        }else{
            idNota = IDNota.create(id);
        }
        let fechaCreacion = fecha.create(fechaC);
        let titulo = tituloNota.create(tituloNot);
        let estadoNote = estadoNota.create(estado);
        let descripcion = descripcionNota.create(descrip);

        if ((fechaCreacion.isLeft()) && (titulo.isLeft())) {
            return Either.makeLeft<Error, NoteAggregate>(new Error('No se puede crear una nota sin fecha'));
        }else{
            if(titulo.isLeft()){
                return Either.makeLeft<Error, NoteAggregate>(titulo.getLeft());
            }
            return Either.makeRight<Error, NoteAggregate>(new NoteAggregate(idNota, fechaCreacion.getRight(), titulo.getRight(), estadoNote.getRight(), descripcion.getRight()));
        }

    }

    //GETTERS
    public getid(): IDNota {
        return this.idNota;
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

    public getdescripcionNota(): descripcionNota {
        return this.descripcion;
    }
    //SETTERS
    public setbodyNota(body: body){
        this.body.push(body);
    }
}
