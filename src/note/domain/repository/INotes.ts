import { Either } from "../../../generics/Either";
import { IDNota } from "../valueObjects/IDNota";
import { NoteAggregate } from "../noteAggregate";

export interface INotes {
    saveNota(nota: NoteAggregate): Promise<Either<string, Error>>;
    editNota(nota : IDNota): Promise<Either<NoteAggregate,Error>>;
}