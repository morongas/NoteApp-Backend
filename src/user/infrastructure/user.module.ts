import { Module } from '@nestjs/common';
import { UserService } from './user.adapter';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
