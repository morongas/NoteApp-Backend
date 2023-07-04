import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from '../domain/repository/IUser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { Either } from "../../generics/Either";
import { Usuario } from '../domain/Usuario';

@Injectable()
export class adapterUserRepository implements IUser<UserEntity>{
  constructor(
    @InjectRepository(UserEntity)
    private readonly repositorio: Repository<UserEntity>,
) {}

  async getNotes(nota: number){

    const resultado = await this.repositorio.findOne({
      where:{id:nota},
      relations:{
        tags: {
          notas: true
        },
        notes:true
    }});
    if(!resultado) throw new NotFoundException(`Usuario de ID: '${nota}' no encontrado`);
    return resultado

  }
  
  async registrarUsuario(usuario: Usuario): Promise<Either<Error, UserEntity>> {
    const usuarioAux: UserEntity = {
      primer_nombre: usuario.getNombres().getPrimerNombre(),
      segundo_nombre: usuario.getNombres().getSegundoNombre(),
      nombre_completo: usuario.getNombres().getNombreCompleto(),
      usuario: usuario.getCredenciales().getUsuario(),
      clave: usuario.getCredenciales().getClave(),
      correo: usuario.getCredenciales().getEmail(),
      fecha_nacimiento: usuario.getFechas().getFechaNacimiento(),
      fecha_suscripcion: usuario.getFechas().getFechaSuscripcion(),
      telefono: usuario.getTelefono().getTelefono()

    };
    try{
      const resultado = await this.repositorio.save(usuarioAux);
      return Either.makeRight<Error, UserEntity>(usuarioAux);
    }catch(error){
      return Either.makeLeft<Error, UserEntity>(error);
  }
  }
}
