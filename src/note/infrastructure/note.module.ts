import { Module } from '@nestjs/common';
import { NoteController } from './NoteController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { adapterNoteRepository } from './adapterNoteRepository';
import { NoteEntity } from './entities/note_entity';


@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity])],
  controllers: [NoteController],
  providers: [adapterNoteRepository]
})
export class NoteModule {}
