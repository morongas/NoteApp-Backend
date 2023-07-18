import { Either } from "../../../generics/Either";
import { IDNota } from "../valueObjects/IDNota";
import {body} from "../entities/body";

export interface IBody<T>{
    saveBody(body: body): Promise<Either<Error, T>>;
    editBody(id: string, body: body): Promise<Either<Error, string>>;
    deleteBody(id: string): Promise<Either<Error, string>>;
}