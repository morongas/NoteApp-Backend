import { Either } from "src/generics/Either";


export class NombreEtiqueta{
    constructor(
        private nombreEtiqueta: string
    ){}

    getNombreEtiqueta(): string{
        return this.nombreEtiqueta;
    }

    static create(nombre: string): Either<Error,NombreEtiqueta>{
        if(nombre===undefined) return Either.makeLeft<Error, NombreEtiqueta>(new Error('No se a insertado el nombre a una etiqueta'));
        else return Either.makeRight<Error,NombreEtiqueta>(new NombreEtiqueta(nombre))
    }
}