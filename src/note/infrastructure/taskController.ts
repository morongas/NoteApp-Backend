import { Body, Controller, Delete, Param, Post, Put, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { addTaskService } from "../application/addTaskService";
import { addTaskDto } from "../application/dto/addTaskDto";
import { editTaskDto } from "../application/dto/editTaskDto";
import { updateTaskService } from "../application/updateTaskService";
import { deleteTaskDto } from "../application/dto/deleteTaskDto";
import { deleteTaskService } from "../application/deleteTaskService";
import { adapterTask } from "./adapterTask";


@ApiTags('task')
@Controller('task')
export class taskController{
    constructor(    private readonly repoItask: adapterTask,
                    private  repo: addTaskService,
                    private  repoUpdate: updateTaskService, 
                    private  repoDelete: deleteTaskService)
                {
                    this.repo = new addTaskService(this.repoItask);
                    this.repoUpdate = new updateTaskService(this.repoItask);
                    this.repoDelete = new deleteTaskService(this.repoItask);
                }

    @ApiBody({type: addTaskDto})
    @Post(':id')
    async create(@Param('id') id: string,@Body() body?, @Req() request?): Promise<string> {
        let idNota = id;
        let text = body.text;
        let status = body.status;
        let fechaCreacion = body.fechaCreacion;
        let dto = new addTaskDto(idNota,text,status,fechaCreacion);
        let resultado = await this.repo.execute(dto);
        if (resultado.isLeft()) {
            return "No se pudo crear la tarea: "+resultado.getLeft().message;
        }else{
            return "Tarea creada";
        }
    }

    @ApiBody({type: editTaskDto})
    @Put(':id')
    async update(@Param('id') id:string, @Body() body, @Req() request): Promise<string> {
        let idTask = id;
        let text = body.text;
        let status = body.status;
        let dto = new editTaskDto(text,status,idTask);
        let resultado = await this.repoUpdate.execute(dto);
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
        let resultado = await this.repoDelete.execute(dto);
        if (resultado.isLeft()) {
            return "No se pudo eliminar la tarea: "+resultado.getLeft();
        }else{
            return "Tarea eliminada";
        }
    }
}