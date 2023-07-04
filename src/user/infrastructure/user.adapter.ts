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
    const usuarioEntidad: UserEntity = UserEntity.create()
    usuarioEntidad.primer_nombre= usuario.getNombres().getPrimerNombre();
    usuarioEntidad.segundo_nombre= usuario.getNombres().getSegundoNombre();
    usuarioEntidad.nombre_completo= usuario.getNombres().getNombreCompleto();
    usuarioEntidad.usuario= usuario.getCredenciales().getUsuario();
    usuarioEntidad.clave= usuario.getCredenciales().getClave();
    usuarioEntidad.correo= usuario.getCredenciales().getEmail();
    usuarioEntidad.fecha_nacimiento= usuario.getFechas().getFechaNacimiento();
    usuarioEntidad.fecha_suscripcion= usuario.getFechas().getFechaSuscripcion();
    usuarioEntidad.telefono= usuario.getTelefono().getTelefono();
    try{
      
      const resultado = await this.repositorio.save(usuarioEntidad);
      return Either.makeRight<Error, UserEntity>(resultado);
    }catch(error){
      return Either.makeLeft<Error, UserEntity>(error);
  }
  }
}
