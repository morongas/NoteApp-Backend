import { IUser } from "../domain/repository/IUser";
import { Inject, Injectable } from "@nestjs/common";
import { crearUsuarioDto } from "./dto/crearUsuarioDto";
import { Usuario } from "../domain/Usuario";
import { Either } from "src/generics/Either";



@Injectable()
export class registrarUsuario<T,Q extends any>{
    private UserRepository: IUser<T,Q>;
    constructor(@Inject('IUser<T>')  repo: IUser<T,Q>) {
        this.UserRepository = repo;
    }

    async execute(dto: crearUsuarioDto): Promise<Either<Q,T>>{
        
        const usuario = Usuario.create(dto.usuario,dto.clave,dto.email,dto.primer_nombre,
                        dto.segundo_nombre,dto.fecha_nacimiento, dto.telefono)
        
        if(usuario.isLeft()) return Either.makeLeft<Q,T>(<Q>usuario.getLeft())

        return Either.makeRight<Q,T>(<T>usuario.getRight())
    }

}