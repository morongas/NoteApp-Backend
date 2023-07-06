import { UsuarioId } from "src/user/domain/valueObjects/UsuarioId";
import { EtiquetaId } from "./ValueObjects/EtiquetaId";
import { NombreEtiqueta } from "./ValueObjects/NombreEtiqueta";
import { Either } from "src/generics/Either";
import { timeStamp } from "console";
import { NoteAggregate } from "src/note/domain/noteAggregate";
import { IDNota } from "src/note/domain/valueObjects/IDNota";

export class Etiqueta{
    constructor(
        private id: EtiquetaId,
        private idUsuario: UsuarioId,
        private nombre: NombreEtiqueta,
        private notas?: IDNota[]
        ){}

    public getId(): EtiquetaId{
        return this.id
    }

    public getNombre(): NombreEtiqueta{
        return this.nombre
    }

    public getIdUsuario(): UsuarioId{
        return this.idUsuario
    }

    public getNotas(): IDNota[]{
        return this.notas
    }

    static create(idUsuario: number, nombre: string, id?: string): Either<Error,Etiqueta>{
        let idEtiqueta: EtiquetaId;

        if(id === undefined) idEtiqueta = EtiquetaId.create();
        else idEtiqueta = EtiquetaId.create(id);
    
        let idUser = UsuarioId.addIdTo(idUsuario);
        let name = NombreEtiqueta.create(nombre);

        if(idUser.isLeft() || name.isLeft()){ //No se inserto algun valor obligatorio
            var errorMessage = new String( "Se presentaron los siguientes errores al intentar crear el tag: " );
            if(idUser.isLeft()) { 
                errorMessage.concat('No se inserto el id de usuario ');
            }
            if(name.isLeft()){
                errorMessage.concat('No se inserto el nombre de la etiqueta')
            } 

            return Either.makeLeft<Error, Etiqueta>(new Error(errorMessage.toString()));
        
        } 
        return Either.makeRight<Error, Etiqueta>(new Etiqueta(idEtiqueta,idUser.getRight(),name.getRight()))
    }

    static edit(idUsuario: number, nombre: string, id: string, idNotas: string[]): Either<Error,Etiqueta>{
        let idEtiqueta: EtiquetaId;

        if(id === undefined) idEtiqueta = EtiquetaId.create();
        else idEtiqueta = EtiquetaId.create(id);
    
        let idUser = UsuarioId.addIdTo(idUsuario);
        let name = NombreEtiqueta.create(nombre);

        let notas: IDNota[]=[] //= [IDNota.create2('1')];
        idNotas.forEach( function (ids) {
            notas.push(IDNota.create2(ids))
        })


        if(idUser.isLeft() || name.isLeft()){ //No se inserto algun valor obligatorio
            var errorMessage = new String( "Se presentaron los siguientes errores al intentar crear el tag: " );
            if(idUser.isLeft()) { 
                errorMessage.concat('No se inserto el id de usuario ');
            }
            if(name.isLeft()){
                errorMessage.concat('No se inserto el nombre de la etiqueta')
            } 

            return Either.makeLeft<Error, Etiqueta>(new Error(errorMessage.toString()));
        
        } 
        return Either.makeRight<Error, Etiqueta>(new Etiqueta(idEtiqueta,idUser.getRight(),name.getRight(), notas))
    }

}