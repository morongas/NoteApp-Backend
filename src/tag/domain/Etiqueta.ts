import { UsuarioId } from "src/user/domain/valueObjects/UsuarioId";
import { EtiquetaId } from "./ValueObjects/EtiquetaId";
import { NombreEtiqueta } from "./ValueObjects/NombreEtiqueta";
import { Either } from "src/generics/Either";

export class Etiqueta{
    constructor(
        public id: EtiquetaId,
        public idUsuario: UsuarioId,
        public nombre: NombreEtiqueta
        ){}

    public getId(): EtiquetaId{
        return this.id
    }

    public getNombre(): NombreEtiqueta{
        return this.nombre
    }

    static create(id: string, idUsuario: number, nombre: string ): Either<Error,Etiqueta>{
        let idEtiqueta: EtiquetaId;

        if(id === undefined){
            idEtiqueta = EtiquetaId.create();
        }else{
            idEtiqueta = EtiquetaId.create(id);
        }

        let idUser = UsuarioId.addIdTo(idUsuario);
        let name = NombreEtiqueta.create(nombre);

        if(idUser.isLeft() || name.isLeft()){ //No se inserto algun valor obligatorio
            var errorMessage = new String( "Se presentaron los siguientes errores al intentar crear el tag: " );
            if(idUser.isLeft()) errorMessage.concat(idUser.getLeft().message,' ')
            if(name.isLeft()) errorMessage.concat(name.getLeft().message,' ')

            return Either.makeLeft<Error, Etiqueta>(new Error(errorMessage.toString()));
        
        } return Either.makeRight<Error, Etiqueta>(new Etiqueta(idEtiqueta,idUser.getRight(),name.getRight()))
    }
}