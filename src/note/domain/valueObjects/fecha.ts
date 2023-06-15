import { Either } from "src/generics/Either";

export class fecha{
    private fecha: Date;
    private constructor(fecha: Date){
        this.fecha = fecha;
    }
    getFecha(): Date{
        return this.fecha;
    }
    static create(fe: Date): Either<Error,fecha>{
        if(fe === undefined){
            return Either.makeLeft<Error, fecha>(new Error('No se puede crear una nota sin fecha'));
        }
        return Either.makeRight<Error,fecha>(new fecha(fe));
    }

}