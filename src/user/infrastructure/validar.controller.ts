import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { getNotesByUserService } from '../application/getNotesByUserService';
import { UserEntity } from './entities/user.entity';
import { Either } from "../../generics/Either";
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { crearUsuarioDto } from '../application/dto/crearUsuarioDto';
import { registrarUsuario } from '../application/registrarUsuario';
import { adapterUserRepository } from './user.adapter';
import { adapterDecorator } from 'src/core/infrastructure/adapterDecorator';
import { concreteLogger } from 'src/core/application/concretLogger';
import { response } from 'express';

@ApiTags('Validar')
@Controller('validar')
export class ValidarController {
  constructor(private readonly repoIuser: adapterUserRepository, private readonly repoLogger: adapterDecorator,
              private  userService: getNotesByUserService<UserEntity>
              ) 
            {
              this.userService = new getNotesByUserService<UserEntity>(this.repoIuser);
            }

  
  @Get(':id')
  async findNotes(@Param('id') id: string, @Res() response?) {
    const result = await this.repoIuser.validarSuscripcion(+id);
    if (( result).isLeft()) {
      return response.status(HttpStatus.NOT_FOUND).json('Usuario no encontrado');
    }else{
      return response.status(HttpStatus.OK).json(result.getRight());
    }
  }

}
