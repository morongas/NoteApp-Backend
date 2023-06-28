import { Module } from '@nestjs/common';
import { NoteController } from './NoteController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { adapterNoteRepository } from './adapterNoteRepository';
import { NoteEntity } from './entities/note_entity';
import { createnoteService } from '../application/createNoteService';
import { updatenoteService } from '../application/updateNoteService';
import { adapterBody } from './adapterBody';
import { bodyEntity } from './entities/body_entity';
import { addBodyController } from './addBodyController';
import { addBodyToNoteService } from '../application/addBodyToNoteService';
import { findNoteService } from '../application/findNoteService';
import { updateBodyFromNoteService } from '../application/updateBodyFromNoteService';


@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity]), TypeOrmModule.forFeature([bodyEntity])],
  controllers: [NoteController,addBodyController],
  providers: [createnoteService,updatenoteService,addBodyToNoteService,findNoteService,updateBodyFromNoteService,{
    provide: 'INotes',
    useClass: adapterNoteRepository,

  },{provide: 'IBody',
      useClass: adapterBody,
  }]
})
export class NoteModule {}
