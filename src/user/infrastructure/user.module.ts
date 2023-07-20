import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './entities/user.entity';
import { getNotesByUserService } from '../application/getNotesByUserService';
import { adapterUserRepository } from './user.adapter';
import { registrarUsuario } from '../application/registrarUsuario';
import { logg_entity } from 'src/note/infrastructure/entities/logg_entity';
import { adapterDecorator } from 'src/core/infrastructure/adapterDecorator';
import { ValidarController } from './validar.controller';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), TypeOrmModule.forFeature([logg_entity])],
  controllers: [UserController,ValidarController],
  providers: [getNotesByUserService, adapterUserRepository, adapterDecorator, {
    provide: 'IUser<T>',
    useClass: adapterUserRepository,
  },registrarUsuario,{
      provide: 'IUser<T>',
      useClass: adapterUserRepository,
    }]
})
export class UserModule {}
