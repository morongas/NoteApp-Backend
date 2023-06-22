import { Either } from "src/generics/Either";


export class NombreEtiqueta{
    constructor(
        private nombreEtiqueta: string
    ){}

    getNombreEtiqueta(): string{
        return this.nombreEtiqueta;
    }

    static create(nombre: string): Either<Error,NombreEtiqueta>{
        if(nombre===undefined) return Either.makeLeft<Error, NombreEtiqueta>(new Error('No se puede crear una nota sin titulo'));
        else return Either.makeRight<Error,NombreEtiqueta>(new NombreEtiqueta(nombre))
    }
}