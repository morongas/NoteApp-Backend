import { Module } from '@nestjs/common';
import { NoteController } from './NoteController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { adapterNoteRepository } from './adapterNoteRepository';
import { NoteEntity } from './entities/note_entity';
import { createnoteService } from '../application/createNoteService';


@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity])],
  controllers: [NoteController],
  providers: [createnoteService, adapterNoteRepository]
})
export class NoteModule {}
