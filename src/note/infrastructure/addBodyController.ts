import { Body, Controller, Delete, Param, Post, Put, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { addBodyToNoteService } from "../application/addBodyToNoteService";
import { addBodyDto } from "../application/dto/addBodyDto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiExcludeController, ApiTags } from "@nestjs/swagger";
import { updateBodyFromNoteService } from "../application/updateBodyFromNoteService";
import { deleteBodyService } from "../application/deleteBodyService";

import { updateBodyDto } from "../application/dto/updateBodyDto";
import { deleteBodyDto } from "../application/dto/deleteBodyDto";

@ApiTags('Body')
@Controller('body')
export class addBodyController {
    constructor(private readonly repo: addBodyToNoteService, private readonly repoUpdate: updateBodyFromNoteService, private readonly repoDelete: deleteBodyService) {}

    @ApiBody({type: addBodyDto})
    @Post(':id')
    @UseInterceptors(FileInterceptor('file'))
    async create(@Param('id') id: string,@Body() body?, @Req() request?, @UploadedFile() fileImg?: Express.Multer.File): Promise<string> {
        let idNota = id;
        let text = body.text;
        let fecha = body.fecha;
        let img ;
        let dto: addBodyDto;
        if(fileImg===undefined){
            dto = new addBodyDto(idNota,fecha,text);
        }
        if(fileImg){
            img = fileImg.buffer;
            dto = new addBodyDto(idNota,fecha,text,img);
        }
        let resultado = await this.repo.execute(dto);
        if (resultado.isLeft()) {
            return "No se pudo crear el body: "+resultado.getLeft().message;
        }else{
            return "Body creado";
        }
    }

    @ApiBody({type: updateBodyDto})
    @Put(':idBody')
    @UseInterceptors(FileInterceptor('file'))
    async update(@Param('idBody') idBody: string,@Body() body?, @Req() request?, @UploadedFile() fileImg?: Express.Multer.File): Promise<string> {
        let idbody = idBody;
        let text = body.text;
        let fecha = body.fecha;
        let img ;
        let dto: updateBodyDto;
        if(fileImg===undefined){
            dto = new updateBodyDto(idbody,fecha,text);
        }
        if(fileImg){
            img = fileImg.buffer;
            dto = new updateBodyDto(idbody,fecha,text,img);
        }
        let resultado = await this.repoUpdate.execute(dto);
        if (resultado.isLeft()) {
            return "No se pudo editar el body: "+resultado.getLeft().message;
        }else{
            return "Body editado";
        }
    }

    @Delete(':id')
    async delete(@Param('id') id:string, @Req() request): Promise<string> {
        let idBody = id;
        let dto = new deleteBodyDto(idBody);
        let resultado = await this.repoDelete.execute(dto);
        if (resultado.isLeft()) {
            return "No se pudo eliminar la tarea: "+resultado.getLeft();
        }else{
            return "Body eliminado";
        }
    }





}