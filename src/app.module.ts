import { Module } from '@nestjs/common';
import { NoteModule } from './note/infrastructure/note.module';
import { ConfigModule } from '@nestjs/config';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configDatabase';
import { createnoteService } from './note/application/createNoteService';
import { adapterNoteRepository } from './note/infrastructure/adapterNoteRepository';
import { NoteController } from './note/infrastructure/NoteController';
import { NoteEntity } from './note/infrastructure/entities/note_entity';
import { UserModule } from './user/infrastructure/user.module';
import { TagModule } from './tag/infrastructure/tag.module';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(typeOrmConfig),
    NoteModule,
    UserModule,
    TagModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
