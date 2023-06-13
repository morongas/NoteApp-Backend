import { Either } from "../../../generics/Either";
import { IDNota } from "../valueObjects/IDNota";
import { NoteAggregate } from "../noteAggregate";

export interface INotes {
    saveNota(nota: NoteAggregate): Promise<Either<Error, string>>;
    editNota(id : string, nota: NoteAggregate): Promise<Either<Error, string>>;
}