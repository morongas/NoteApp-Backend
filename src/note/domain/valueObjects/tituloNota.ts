import { Either } from "src/generics/Either";

export class tituloNota {
    private tituloNota: string;
    private constructor(tituloNota: string) {
        this.tituloNota = tituloNota;
    }
    getTituloNota(): string {
        return this.tituloNota;
    }
    static create(titulo: string): Either<Error,tituloNota> {
        if (tituloNota === undefined) {
            return Either.makeLeft<Error, tituloNota>(new Error('No se puede crear una nota sin titulo'));
        }
        return Either.makeRight<Error,tituloNota>(new tituloNota(titulo));
    }
}