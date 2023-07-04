import { Either } from "src/generics/Either";

export class UsuarioId{
    constructor(
        private id?: number
    ){}


    getIDUser(): number{
        return this.id;
    }

    static create(id?:number): UsuarioId{
        return new UsuarioId(id);
    }

    static addIdTo(id?:number): Either<Error,UsuarioId>{
        if(id===undefined) return Either.makeLeft<Error,UsuarioId>(Error("No se ha ingresado el ID del usuario"))
        else return Either.makeRight<Error,UsuarioId>(new UsuarioId(id))
    }

}