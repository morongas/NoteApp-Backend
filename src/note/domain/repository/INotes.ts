import { Either } from "../../../generics/Either";
import { IDNota } from "../valueObjects/IDNota";
import { NoteAggregate } from "../noteAggregate";

export interface INotes<T>{
    saveNota(nota: NoteAggregate): Promise<Either<Error, T>>;
    editNota(id : string, nota: NoteAggregate): Promise<Either<Error, string>>;
    buscarNota(id: string): Promise<Either<Error, NoteAggregate>>;
    deleteNota(id: string): Promise<Either<Error, string>>;
}