import { Either } from "src/generics/Either";
import { Optional } from "src/generics/Optional";

export class etiquetaNota {
    private etiqueta?: string;
    private constructor(etiqueta: string) {
        this.etiqueta = etiqueta;
    }
    getEtiquetaNota(): Optional<string> {
        if(this.etiqueta == undefined){
            return new Optional<string>();
        }else{
            return new Optional<string>(this.etiqueta);
        }
    }
    static create(etiqueta: string): Either<Error, etiquetaNota> {
        if (etiqueta === undefined) {
            return Either.makeLeft<Error, etiquetaNota>(new Error('No se puede crear una nota sin etiqueta'));
        }
        return Either.makeRight<Error, etiquetaNota>(new etiquetaNota(etiqueta));
    }

}