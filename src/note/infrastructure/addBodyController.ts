import { Body, Controller, Param, Post, Put, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { addBodyToNoteService } from "../application/addBodyToNoteService";
import { addBodyDto } from "../application/dto/addBodyDto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiExcludeController, ApiTags } from "@nestjs/swagger";
import { updateBodyFromNoteService } from "../application/updateBodyFromNoteService";
import { updateBodyDto } from "../application/dto/updateBodyDto";

@ApiTags('Body')
@Controller('body')
export class addBodyController {
    constructor(private readonly repo: addBodyToNoteService, private readonly repoUpdate: updateBodyFromNoteService) {}

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
            console.log("no hay imagen");
            console.log(fileImg);
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
            console.log("no hay imagen");
            console.log(fileImg);
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





}