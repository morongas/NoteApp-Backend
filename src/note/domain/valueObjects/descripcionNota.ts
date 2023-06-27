import { Either } from "src/generics/Either";

export class descripcionNota{
    private descripcion?: string;

    private constructor(descripcion: string){
        this.descripcion = descripcion;
    }

    public static create(descripcion: string): Either<Error, descripcionNota>{
        return Either.makeRight<Error,descripcionNota>(new descripcionNota(descripcion));
    }

    public getDescripcion(): string{
        return this.descripcion;
    }



}