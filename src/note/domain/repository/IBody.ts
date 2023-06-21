import { Either } from "../../../generics/Either";
import { IDNota } from "../valueObjects/IDNota";
import {body} from "../entities/body";

export interface IBody {
    saveBody(body: body): Promise<Either<Error, string>>;
    editBody(id: string, body: body): Promise<Either<Error, string>>;
}