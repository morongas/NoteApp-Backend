import { Either } from "src/generics/Either";
import { ITask } from "../domain/repository/ITask";
import { task } from "../domain/entities/task";
import { taskEntity } from "./entities/task_entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Optional } from "src/generics/Optional";
import { NoteEntity } from "./entities/note_entity";

export class adapterTask implements ITask<taskEntity>{
    constructor(
        @InjectRepository(taskEntity)
        private readonly repositorio: Repository<taskEntity>,
        @InjectRepository(NoteEntity)
        private readonly repositorio2: Repository<NoteEntity>
    ) { }


    async saveTask(tarea: task): Promise<Either<Error, taskEntity>> {
        const result = await this.repositorio2.find({ 
            where: {
                idNota: tarea.getIdNota().getIDNota()
            }
        }); 

        if(result.length == 0){
            return Either.makeLeft<Error,taskEntity>((new Error('La nota no existe'))); 
        }

        const aux: taskEntity = {
            IDtask: tarea.getId().getId(),
            title: tarea.getTitle().getTitle(),
            fechaCreacion: tarea.getDate(),
            status: tarea.getStatus(),
            nota: tarea.getIdNota().getIDNota()
        };
        try {
            const resultado = await this.repositorio.save(aux);
            return Either.makeRight<Error, taskEntity>(resultado);
        }catch (error) {
            return Either.makeLeft<Error, taskEntity>(error);
        }
    }

    async editTask(id: string, task: task): Promise<Either<Error, string>> {
        let taskToUpdate: taskEntity;
        taskToUpdate = await this.repositorio.findOneBy({
            IDtask: id,
        })

        const tasknote = new Optional<taskEntity>(taskToUpdate);

        if (!tasknote.hasvalue()) {
            return Either.makeLeft<Error, string>((new Error('La tarea no existe')));
        }

        if(task.getTitle().getTitle() ===""){
            taskToUpdate.status = task.getStatus();
        }else{
            taskToUpdate.title = task.getTitle().getTitle();
            taskToUpdate.status = task.getStatus();
        }

        try {
            const resultado = await this.repositorio.save(taskToUpdate);
            return Either.makeRight<Error, string>('Se edito la tarea exitosamente');
        }catch (error) {
            return Either.makeLeft<Error, string>(error);
        }
    }

    async deleteTask(id: string): Promise<Either<Error, string>> {
        let taskToDelete: taskEntity;
        taskToDelete = await this.repositorio.findOneBy({
            IDtask: id,
        })

        const tasknote = new Optional<taskEntity>(taskToDelete);

        if (!tasknote.hasvalue()) {
            return Either.makeLeft<Error, string>((new Error('La tarea no existe')));
        }

        try {
            const resultado = await this.repositorio.delete(taskToDelete);
            return Either.makeRight<Error, string>('Se elimino la tarea exitosamente');
        }catch (error) {
            return Either.makeLeft<Error, string>(error);
        }
    }
    
}