import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from '../domain/repository/IUser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { Either } from "../../generics/Either";

@Injectable()
export class adapterUserRepository implements IUser<UserEntity>{
  constructor(
    @InjectRepository(UserEntity)
    private readonly repositorio: Repository<UserEntity>,
) {}

  async getNotes(nota: string){

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
  
  async registrarUsuario(): Promise<Either<Error, string>> {
    return 
  }
}
