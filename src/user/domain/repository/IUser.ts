import { IDNota } from "src/note/domain/valueObjects/IDNota";
import { Either } from "../../../generics/Either";


export interface IUser<T>{
   registrarUsuario(): Promise<Either<Error, string>>
   getNotes(nota : string): Promise<T>;
}