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
import { taskEntity } from './entities/task_entity';
import { taskController } from './taskController';
import { addTaskService } from '../application/addTaskService';
import { adapterTask } from './adapterTask';
import { updateTaskService } from '../application/updateTaskService';
import { deleteTaskService } from '../application/deleteTaskService';
import { lateController } from './lateController';
import { lateService } from '../application/lateService';


@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity]), TypeOrmModule.forFeature([bodyEntity]), TypeOrmModule.forFeature([taskEntity])],
  controllers: [NoteController,addBodyController,taskController,lateController],
  providers: [createnoteService,updatenoteService,addBodyToNoteService,findNoteService,updateBodyFromNoteService,addTaskService,lateService,
    updateTaskService,deleteTaskService,{
    provide: 'INotes',
    useClass: adapterNoteRepository,

  },{provide: 'IBody',
      useClass: adapterBody,
    }, {
      provide: 'ITask',
      useClass: adapterTask,
    }]
})
export class NoteModule {}
