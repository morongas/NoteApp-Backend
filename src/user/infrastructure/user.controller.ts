import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { getNotesByUserService } from '../application/getNotesByUserService';
import { UserEntity } from './entities/user.entity';
import { Either } from "../../generics/Either";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario')
@Controller('user')
export class UserController {
  constructor(private readonly userService: getNotesByUserService<UserEntity[]>) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

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
    return this.userService.execute(id);
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
