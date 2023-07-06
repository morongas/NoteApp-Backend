import { IAppService } from "src/core/application/IAppService";
import { deleteTaskDto } from "./dto/deleteTaskDto";
import { Either } from "src/generics/Either";
import { Inject } from "@nestjs/common";
import { ITask } from "../domain/repository/ITask";

export class deleteTaskService implements IAppService<deleteTaskDto, string>{
    private taskRepository: ITask;

    constructor(@Inject('ITask') repo: ITask) {
        this.taskRepository = repo;
    }
    
    
    async execute(dto: deleteTaskDto): Promise<Either<Error, string>> {
        let result = await this.taskRepository.deleteTask(dto.idtask);
        if((result).isLeft()){
            return result; 
        }
        return Either.makeRight<Error,string>("Resultado "+  result);
    }

}