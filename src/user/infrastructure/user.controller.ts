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

@ApiTags('Usuario')
@Controller('user')
export class UserController {
  constructor(private readonly repoIuser: adapterUserRepository, private readonly repoLogger: adapterDecorator,
              private  userService: getNotesByUserService<UserEntity>,
              private  crearUsuario: registrarUsuario<UserEntity>) 
            {
              this.userService = new getNotesByUserService<UserEntity>(this.repoIuser);
              this.crearUsuario = new registrarUsuario<UserEntity>(this.repoIuser);
            }

  @ApiBody({type: crearUsuarioDto})
  @Post()
  async registrarUsuario(@Body() body, @Res() response){
    const dto: crearUsuarioDto = new crearUsuarioDto(body.usuario, body.clave, body.email, 
      body.primer_nombre,body.segundo_nombre,body.fecha_nacimiento,body.telefono, body.suscripcion_gratis)
      let result = await new concreteLogger(this.crearUsuario, this.repoLogger, "user created").execute(dto);

      if (result.isLeft()) {
        return response.status(HttpStatus.NOT_ACCEPTABLE).json(result.getLeft().message);
      }else{
        return response.status(HttpStatus.OK).json(result.getRight());
      }
  }


  @Get(':id/notes')
  findNotes(@Param('id') id: string) {
    return this.userService.execute(+id);
  }

}
