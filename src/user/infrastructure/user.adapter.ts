import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from '../domain/repository/IUser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { Either } from "../../generics/Either";
import { Usuario } from '../domain/Usuario';
import { IValidar } from '../domain/repository/IValidar';

@Injectable()
export class adapterUserRepository implements IUser<UserEntity>, IValidar{
  constructor(
    @InjectRepository(UserEntity)
    private readonly repositorio: Repository<UserEntity>
  ) {}

  async validarSuscripcion(usuarioId: number): Promise<Either<Error,boolean>>{
        
    const resultUser = await this.repositorio.find({ 
        where: {
            id: usuarioId
        }
    });

    if(resultUser.length===0) return Either.makeLeft<Error,boolean>(new Error('Usuario no encontrado'))

    if(resultUser[0].suscripcion=='Gratis'){
        const count = await this.repositorio.query(`select count(*) from "note" join "bodyNote" on "notaIdNota" = "idNota" where "ocr" = true and "userId" =`+resultUser[0].id+``)
        if(count[0].count>=6) return Either.makeRight<Error,boolean>(false)
    }
    return Either.makeRight<Error,boolean>(true)
  }

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
    usuarioEntidad.suscripcion= usuario.getSuscripcion().getSuscripcion()
    try{
      
      const resultado = await this.repositorio.save(usuarioEntidad);
      return Either.makeRight<Error, UserEntity>(resultado);
    }catch(error){
      return Either.makeLeft<Error, UserEntity>(error);
  }
  }
}
