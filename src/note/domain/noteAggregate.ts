import { Either } from "src/generics/Either";
import { IDNota } from "./valueObjects/IDNota";
import { estadoNota } from "./valueObjects/estadoNota";
import { fecha } from "./valueObjects/fecha";
import { gpsNota } from "./valueObjects/gpsNota";

import { tituloNota } from "./valueObjects/tituloNota";
import { body } from "./entities/body";
import { descripcionNota } from "./valueObjects/descripcionNota";
import { task } from "./entities/task";
import { UsuarioId } from "src/user/domain/valueObjects/UsuarioId";
import { timeStamp } from "console";

export class NoteAggregate{

    
    private idNota: IDNota;
    private tituloNota: tituloNota;
    private fechaCreacion: fecha;
    private estado?: estadoNota;
    private descripcion?: descripcionNota;
    private body?: body[] = [];
    private tareas?: task[] = [];
    private idUsuario?: UsuarioId;
    private geolocalizacion?: gpsNota;

    private constructor(idNota: IDNota, fechaCreacion: fecha, titulo?: tituloNota, estado?: estadoNota, descrip?: descripcionNota, idUsuario?: UsuarioId, gps?:gpsNota) {
        this.idUsuario = idUsuario;
        this.idNota = idNota;
        this.tituloNota = titulo;
        this.fechaCreacion = fechaCreacion;
        this.estado = estado;
        this.descripcion = descrip;
        this.geolocalizacion = gps;
    }

 
    static create(tituloNot: string, fechaC: Date, latitudGPS?: number, longitudGPS? :number, descripcionGPS?: string, estado?: string, descrip?: string,id?: string, idUsuario?: number):
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
        let gps = gpsNota.create(latitudGPS,longitudGPS,descripcionGPS);
        if(idUsuario != undefined){
            if(gps.isLeft()){
                return Either.makeLeft<Error, NoteAggregate>(new Error(gps.getLeft().message));
            }
        }

        if (fechaCreacion.isLeft()) {
            return Either.makeLeft<Error, NoteAggregate>(new Error(fechaCreacion.getLeft().message));
        }

        if(titulo.isLeft()){
            return Either.makeLeft<Error, NoteAggregate>(new Error(titulo.getLeft().message));
        }

        
        if(idUsuario === undefined){
            return Either.makeRight<Error, NoteAggregate>(new NoteAggregate(idNota, fechaCreacion.getRight(), titulo.getRight(), estadoNote.getRight(), descripcion.getRight()));
        }
        let idUser: UsuarioId = new UsuarioId(idUsuario)
        return Either.makeRight<Error, NoteAggregate>(new NoteAggregate(idNota, fechaCreacion.getRight(),titulo.getRight(), estadoNote.getRight(), descripcion.getRight(),idUser,gps.getRight()));

    }

    static createTask(idNota: string, titulo: string, status: string, fecha: Date): Either<Error, task> {
        const tarea = task.createTask(titulo, fecha, status, idNota);
        if(tarea.isLeft()){
            return Either.makeLeft<Error, task>(tarea.getLeft());
        }else{
            return Either.makeRight<Error, task>(tarea.getRight());
        }
    }

    static editTask(id: string, titulo: string, status: string ): Either<Error, task>{
        const tarea = task.editTask(id, titulo, status);
        if(tarea.isLeft()){
            return Either.makeLeft<Error, task>(tarea.getLeft());
        }else{
            return Either.makeRight<Error, task>(tarea.getRight());
        }
    }

    static createBody(idNota: string,fecha: Date,ocr:boolean, text?: string, imagen?: Buffer): Either<Error, body> {
        const bo = body.create(idNota,fecha,ocr, text, imagen);
        if (bo.isLeft()) {
            return Either.makeLeft<Error, body>(bo.getLeft());
        }else{
            return Either.makeRight<Error, body>(bo.getRight());
        }
    }

    static editBody(id: string,fecha: Date,ocr?:boolean,text?: string, imagen?: Buffer): Either<Error, body> {
        const bo = body.edit(fecha,ocr,text,imagen, id);
        if (bo.isLeft()) {
            return Either.makeLeft<Error, body>(bo.getLeft());
        }else{
            return Either.makeRight<Error, body>(bo.getRight());
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

    public getgpsNota(): gpsNota {
        return this.geolocalizacion;
    }

    public getestadoNota(): estadoNota {
        return this.estado;
    }

    public getdescripcionNota(): descripcionNota {
        return this.descripcion;
    }

    public getIdUsuario(): UsuarioId{
        return this.idUsuario;
    }

    //SETTERS
    public setbodyNota(body: body){
        this.body.push(body);
    }

    public settareaNota(task: task){
        this.tareas.push(task);
    }
}
