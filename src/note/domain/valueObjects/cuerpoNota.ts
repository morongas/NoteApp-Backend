import { Either } from "src/generics/Either";
import { Optional } from "src/generics/Optional";

export class cuerpoNota{
    private cuerpoText: string;
    private cuerpoImg: string;
    private constructor(texto?: string, imagen?: string) {
        this.cuerpoText = texto;
        this.cuerpoImg = imagen;
    }
    public getcuerpoNotaText(): string{
        return this.cuerpoText;
    }

    //PENDIENTE
    public getcuerpoNotaImg(): string {
        return this.cuerpoImg;
    }

    static create(texto?: string, imagen?: string): Either<Error, cuerpoNota>{
        if(texto === undefined && imagen === undefined){
            return Either.makeLeft<Error, cuerpoNota>(new Error('No se puede crear una nota sin texto o imagen'));
        }
        return Either.makeRight<Error,cuerpoNota>(new cuerpoNota(texto, imagen));
    }
}