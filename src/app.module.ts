import { Module } from '@nestjs/common';
import { UserModule } from './user/infrastructure/user.module';
import { NoteModule } from './note/infrastructure/note.module';


@Module({
  imports: [
    UserModule,
    NoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
