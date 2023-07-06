import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { getNotesByUserService } from '../application/getNotesByUserService';
import { UserEntity } from './entities/user.entity';
import { Either } from "../../generics/Either";
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { crearUsuarioDto } from '../application/dto/crearUsuarioDto';
import { registrarUsuario } from '../application/registrarUsuario';

@ApiTags('Usuario')
@Controller('user')
export class UserController {
  constructor(private readonly userService: getNotesByUserService<UserEntity>,
    private readonly crearUsuario: registrarUsuario<UserEntity>) {}

  @ApiBody({type: crearUsuarioDto})
  @Post()
  async registrarUsuario(@Body() body, @Res() response){
    const dto: crearUsuarioDto = new crearUsuarioDto(body.usuario, body.clave, body.email, 
      body.primer_nombre,body.segundo_nombre,body.fecha_nacimiento,body.telefono)
      let result = await this.crearUsuario.execute(dto);
      if (result.isLeft()) {
        return response.status(HttpStatus.NOT_ACCEPTABLE).json(result.getLeft().message);
      }else{
        return response.status(HttpStatus.OK).json(result.getRight());
      }
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  @Get(':id/notes')
  findNotes(@Param('id') id: string) {
    return this.userService.execute(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
