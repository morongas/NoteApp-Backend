import { Body, Controller, Delete, HttpStatus, Param, Post, Put, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { addTaskService } from "../application/addTaskService";
import { addTaskDto } from "../application/dto/addTaskDto";
import { editTaskDto } from "../application/dto/editTaskDto";
import { updateTaskService } from "../application/updateTaskService";
import { deleteTaskDto } from "../application/dto/deleteTaskDto";
import { deleteTaskService } from "../application/deleteTaskService";
import { adapterTask } from "./adapterTask";
import { adapterDecorator } from "src/core/infrastructure/adapterDecorator";
import { concreteLogger } from "src/core/application/concretLogger";
import { taskEntity } from "./entities/task_entity";


@ApiTags('task')
@Controller('task')
export class taskController{
    constructor(private readonly repoItask: adapterTask, private readonly repoLogger: adapterDecorator,
                    private  repo: addTaskService<taskEntity>,
                    private  repoUpdate: updateTaskService<taskEntity>, 
                    private  repoDelete: deleteTaskService<taskEntity>)
                {
                    this.repo = new addTaskService(this.repoItask);
                    this.repoUpdate = new updateTaskService(this.repoItask);
                    this.repoDelete = new deleteTaskService(this.repoItask);
                }

    @ApiBody({type: addTaskDto})
    @Post(':id')
    async create(@Param('id') id: string,@Res() response, @Body() body?,@Req() request?): Promise<string> {
        let idNota = id;
        let text = body.text;
        let status = body.status;
        let fechaCreacion = body.fechaCreacion;
        let dto = new addTaskDto(idNota,text,status,fechaCreacion);
        let resultado = await new concreteLogger(this.repo, this.repoLogger, "task created and added to note").execute(dto);
        if (resultado.isLeft()) {
            return response.status(HttpStatus.BAD_REQUEST).json(resultado.getLeft().message);
        }else{
            return response.status(HttpStatus.OK).json(resultado.getRight());
        }
    }

    @ApiBody({type: editTaskDto})
    @Put(':id')
    async update(@Param('id') id:string, @Body() body, @Req() request): Promise<string> {
        let idTask = id;
        let text = body.text;
        let status = body.status;
        let dto = new editTaskDto(text,status,idTask);
        let resultado = await new concreteLogger(this.repoUpdate, this.repoLogger, "task edited").execute(dto);
        if (resultado.isLeft()) {
            return "No se pudo editar la tarea: "+resultado.getLeft().message;
        }else{
            return "Tarea editada";
        }
    }

    @Delete(':id')
    async delete(@Param('id') id:string, @Req() request): Promise<string> {
        let idTask = id;
        let dto = new deleteTaskDto(idTask);
        let resultado = await new concreteLogger(this.repoDelete, this.repoLogger, "task deleted").execute(dto);
        if (resultado.isLeft()) {
            return "No se pudo eliminar la tarea: "+resultado.getLeft();
        }else{
            return "Tarea eliminada";
        }
    }
}