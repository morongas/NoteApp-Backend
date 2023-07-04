import { IUser } from "../domain/repository/IUser";
import { Inject, Injectable } from "@nestjs/common";
import { crearUsuarioDto } from "./dto/crearUsuarioDto";
import { Usuario } from "../domain/Usuario";
import { Either } from "src/generics/Either";



@Injectable()
export class registrarUsuario<T>{
    private UserRepository: IUser<T>;
    constructor(@Inject('IUser<T>')  repo: IUser<T>) {
        this.UserRepository = repo;
    }
    async execute(dto: crearUsuarioDto): Promise<Either<Error,T>>{
        console.log('Voy a crear el usuario\n')
        
        const usuario = Usuario.create(dto.usuario,dto.clave,dto.email,dto.primer_nombre,
                        dto.segundo_nombre,dto.fecha_nacimiento, dto.telefono)
        console.log('Se ha creado el usuario\n')

        if(usuario.isLeft()) return Either.makeLeft<Error,T>(new Error(usuario.getLeft()))

        console.log('Se ha creado el Es right')

        let result = this.UserRepository.registrarUsuario(usuario.getRight())
        return result
    }

}