import { Either } from "src/generics/Either";

export class estadoNota{
    private estado?: string;
    private constructor(estado: string){
        this.estado = estado;
    }
    getEstado(): string{
        return this.estado;
    }
    static create(estado: string): Either<Error,estadoNota>{
        return Either.makeRight<Error,estadoNota>(new estadoNota(estado));
    }
    


}