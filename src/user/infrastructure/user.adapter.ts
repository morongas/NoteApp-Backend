import { Injectable } from '@nestjs/common';
import { IUser } from '../domain/repository/IUser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { Either } from "../../generics/Either";

@Injectable()
export class adapterUserRepository implements IUser<UserEntity[]>{
  constructor(
    @InjectRepository(UserEntity)
    private readonly repositorio: Repository<UserEntity>,
) {}

  async getNotes(nota: string){

    const resultado = await this.repositorio.find({
      relations: {
        tags:true,
        notes: true
        
    },
    });
    return resultado

  }
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // findNotes(id: number) {
  //   return `This action returns notes from user #${id}`;
  // }

  // // update(id: number, updateUserDto: UpdateUserDto) {
  // //   return `This action updates a #${id} user`;
  // // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
