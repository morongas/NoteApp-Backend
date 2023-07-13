import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './entities/user.entity';
import { getNotesByUserService } from '../application/getNotesByUserService';
import { adapterUserRepository } from './user.adapter';
import { registrarUsuario } from '../application/registrarUsuario';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [getNotesByUserService, adapterUserRepository, {
    provide: 'IUser<T>',
    useClass: adapterUserRepository,
  },registrarUsuario,{
      provide: 'IUser<T>',
      useClass: adapterUserRepository,
    }]
})
export class UserModule {}
