import { IAppService } from "src/core/application/IAppService";
import { addTaskDto } from "./dto/addTaskDto";
import { Either } from "src/generics/Either";
import { ITask } from "../domain/repository/ITask";
import { NoteAggregate } from "../domain/noteAggregate";

export class addTaskService<T> implements IAppService<addTaskDto, T>{
    private taskRepository: ITask<T>;

    constructor(repo: ITask<T>) {
        this.taskRepository = repo;
    }
    
    async execute(dto: addTaskDto): Promise<Either<Error, T>> {
        const task = NoteAggregate.createTask(dto.idNota, dto.text, dto.status, dto.fechaCreacion);
        if(task.isLeft()){
            return Promise.resolve(Either.makeLeft<Error, T>(task.getLeft()));
        }else{
            let result = await this.taskRepository.saveTask(task.getRight());
            if(result.isLeft()){
                return result; 
            }
            return result;
        }
    }
}