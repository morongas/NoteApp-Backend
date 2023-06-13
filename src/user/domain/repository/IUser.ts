import { IDNota } from "src/note/domain/valueObjects/IDNota";
import { Either } from "../../../generics/Either";


export interface INotes {
    getNotes(nota : IDNota): Promise<Either<Error, string>>;
}