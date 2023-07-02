import { Body, Controller, Param, Post, Put, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { addTaskService } from "../application/addTaskService";
import { addTaskDto } from "../application/dto/addTaskDto";
import { editTaskDto } from "../application/dto/editTaskDto";
import { updateTaskService } from "../application/updateTaskService";


@ApiTags('task')
@Controller('task')
export class taskController{
    constructor(private readonly repo: addTaskService, private readonly repoUpdate: updateTaskService){}

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
}