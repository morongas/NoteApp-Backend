import { Module } from '@nestjs/common';
import { NoteModule } from './note/infrastructure/note.module';


@Module({
  imports: [
    NoteModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
