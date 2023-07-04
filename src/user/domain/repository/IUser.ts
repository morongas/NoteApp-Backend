import { IDNota } from "src/note/domain/valueObjects/IDNota";
import { Either } from "../../../generics/Either";


export interface IUser<T,Q>{
   registrarUsuario(): Promise<Either<Q, T>>
   getNotes(nota : string): Promise<T>;
}