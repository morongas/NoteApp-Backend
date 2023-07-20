import { Either } from "src/generics/Either";
import { NoteAggregate } from "src/note/domain/noteAggregate";
import { Usuario } from "src/user/domain/Usuario";
import { IUser } from "src/user/domain/repository/IUser";
import { UserEntity } from "src/user/infrastructure/entities/user.entity";

export class mocksUsuario implements IUser<UserEntity>{
    saveNota(nota: NoteAggregate): Promise<Either<Error, UserEntity>> {
        let aux = nota.gettituloNota().getTituloNota();
        if (aux === "Prueba valida") {
            return Promise.resolve(Either.makeRight<Error, UserEntity>(new UserEntity()));
        } else {
            return Promise.resolve(Either.makeLeft<Error, UserEntity>(new Error("Error al guardar")));
        }
    }

    registrarUsuario(usuario: Usuario): Promise<Either<Error, UserEntity>>{
        let username = usuario.getCredenciales().validarCredenciales()
        if(username) return Promise.resolve(Either.makeRight<Error, UserEntity>(new UserEntity()));
        return Promise.resolve(Either.makeLeft<Error, UserEntity>(new Error("Error al registrar usuario")));
    }
    getNotes(nota : number): Promise<UserEntity>{
        throw new Error("Method not implemented.");
    }

}