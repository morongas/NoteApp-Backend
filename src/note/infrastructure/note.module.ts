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
import { deleteBodyService } from '../application/deleteBodyService';
import { deleteNoteService } from '../application/deleteNoteService';
import { UserEntity } from 'src/user/infrastructure/entities/user.entity';
import { logg_entity } from './entities/logg_entity';
import { concreteLogger } from 'src/core/application/concretLogger';
import { adapterDecorator } from 'src/core/infrastructure/adapterDecorator';


@Module({
  imports: [TypeOrmModule.forFeature([NoteEntity]), TypeOrmModule.forFeature([bodyEntity]), TypeOrmModule.forFeature([taskEntity]), TypeOrmModule.forFeature([UserEntity]), TypeOrmModule.forFeature([logg_entity])],
  controllers: [NoteController,addBodyController,taskController,lateController],
  providers: [createnoteService,updatenoteService,addBodyToNoteService,findNoteService,updateBodyFromNoteService,addTaskService,lateService,concreteLogger,
    updateTaskService,deleteTaskService,deleteBodyService,deleteNoteService,adapterNoteRepository,adapterBody,adapterTask,adapterDecorator,{
    provide: 'INotes',
    useClass: adapterNoteRepository,

  },{provide: 'IBody',
      useClass: adapterBody,
    }, {
      provide: 'ITask',
      useClass: adapterTask,
    },{
      provide: 'lateNota',
      useClass: createnoteService
    },{provide: 'lateUpdateNote',
        useClass: updatenoteService},
        {provide: 'deleteNote',
          useClass: deleteNoteService
    }, { provide: 'lateCreateBody',
      useClass: addBodyToNoteService
    }, { provide: 'lateUpdateBody',
      useClass: updateBodyFromNoteService},
    { provide: 'lateDeleteBody',
      useClass: deleteBodyService},
    { provide: 'lateCreateTask', 
      useClass: addTaskService},
    {
      provide: 'lateUpdateTask', 
      useClass: updateTaskService},
    {
      provide: 'lateDeleteTask', 
      useClass: deleteTaskService}
      ]
})
export class NoteModule {}
