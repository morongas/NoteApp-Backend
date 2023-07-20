import { IUser } from "../domain/repository/IUser";
import { crearUsuarioDto } from "./dto/crearUsuarioDto";
import { Usuario } from "../domain/Usuario";
import { Either } from "src/generics/Either";



export class registrarUsuario<T>{
    private UserRepository: IUser<T>;
    constructor(repo: IUser<T>) {
        this.UserRepository = repo;
    }
    async execute(dto: crearUsuarioDto): Promise<Either<Error,T>>{
        let suscrip: string = 'Gratis';
        if(dto.suscripcion_gratis === false){
            suscrip = 'Premium'
        }

        const usuario = Usuario.create(dto.usuario,dto.clave,dto.email,dto.primer_nombre,
                        dto.segundo_nombre,dto.fecha_nacimiento, dto.telefono, suscrip)

        if(usuario.isLeft()) return Either.makeLeft<Error,T>(new Error(usuario.getLeft()))
        let result = this.UserRepository.registrarUsuario(usuario.getRight())
        return result
    }

}