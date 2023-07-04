import { IDNota } from "src/note/domain/valueObjects/IDNota";
import { Either } from "../../../generics/Either";
import { Usuario } from "../Usuario";


export interface IUser<T>{
   registrarUsuario(usuario: Usuario): Promise<Either<Error, T>>
   getNotes(nota : number): Promise<T>;
}