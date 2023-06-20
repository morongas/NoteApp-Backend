import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './entities/user.entity';
import { getNotesByUserService } from '../application/getNotesByUserService';
import { adapterUserRepository } from './user.adapter';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [getNotesByUserService, {
    provide: 'IUser<T>',
    useClass: adapterUserRepository,
  },]
})
export class UserModule {}
