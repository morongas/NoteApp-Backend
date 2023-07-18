import { Body, Controller, Delete, HttpStatus, Param, Post, Put, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { addBodyToNoteService } from "../application/addBodyToNoteService";
import { addBodyDto } from "../application/dto/addBodyDto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiExcludeController, ApiTags } from "@nestjs/swagger";
import { updateBodyFromNoteService } from "../application/updateBodyFromNoteService";
import { deleteBodyService } from "../application/deleteBodyService";
import { updateBodyDto } from "../application/dto/updateBodyDto";
import { deleteBodyDto } from "../application/dto/deleteBodyDto";
import { adapterBody } from "./adapterBody";
import { adapterDecorator } from "src/core/infrastructure/adapterDecorator";
import { concreteLogger } from "src/core/application/concretLogger";
import { bodyEntity } from "./entities/body_entity";

@ApiTags('Body')
@Controller('body')
export class addBodyController {
    constructor(private readonly repoInotes: adapterBody, private readonly repoLogger: adapterDecorator,
                private  repo: addBodyToNoteService<bodyEntity>,
                 private  repoUpdate: updateBodyFromNoteService<bodyEntity>, 
                 private  repoDelete: deleteBodyService<bodyEntity>) 
    {
        this.repo = new addBodyToNoteService(this.repoInotes);
        this.repoUpdate = new updateBodyFromNoteService(this.repoInotes);
        this.repoDelete = new deleteBodyService(this.repoInotes);
    }

    @ApiBody({type: addBodyDto})
    @Post(':id')
    @UseInterceptors(FileInterceptor('file'))
    async create(@Param('id') id: string, @Res() response, @Body() body?, @Req() request?, @UploadedFile() fileImg?: Express.Multer.File): Promise<string> {
        let idNota = id;
        let text = body.text;
        let fecha = body.fecha;
        let ocr = body.ocr;
        let img ;
        let dto: addBodyDto;
        if(((text===undefined || text.length === 0) && fileImg === undefined)){
            return response.status(HttpStatus.FORBIDDEN).json('El body no puede estar vacio');
        } else if (!(text===undefined || text.length === 0) && !(fileImg === undefined)){
            return response.status(HttpStatus.FORBIDDEN).json('El body puede tener texto o imagen, no los dos');
        }

        if(fileImg===undefined){
            dto = new addBodyDto(idNota,fecha,ocr,text);
        }
        if(fileImg){
            img = fileImg.buffer;
            dto = new addBodyDto(idNota,fecha,ocr,text,img);
        }
        let resultado = await new concreteLogger(this.repo, this.repoLogger, "body added").execute(dto);

        if (resultado.isLeft()) {
            return response.status(HttpStatus.FORBIDDEN).json(resultado.getLeft().message);
        }else{
            return response.status(HttpStatus.OK).json(resultado.getRight());
        }
    }

    @ApiBody({type: updateBodyDto})
    @Put(':idBody')
    @UseInterceptors(FileInterceptor('file'))
    async update(@Param('idBody') idBody: string,@Res() response,@Body() body?, @UploadedFile() fileImg?: Express.Multer.File): Promise<string> {
        let idbody = idBody;
        let text = body.text;
        let fecha = body.fecha;
        let img ;
        let dto: updateBodyDto;
        let ocr;
        if(((text===undefined || text.length === 0) && fileImg === undefined)){
            return response.status(HttpStatus.FORBIDDEN).json('El body no puede estar vacio');
        } else if (!(text===undefined || text.length === 0) && !(fileImg === undefined)){
            return response.status(HttpStatus.FORBIDDEN).json('El body puede tener texto o imagen, no los dos');
        }
        if (body.ocr === "true") {
            ocr = true;
        } 
        if (body.ocr === "false") {
            ocr = false;
        }
        if(fileImg===undefined){
            dto = new updateBodyDto(idbody,fecha,ocr,text);
        }
        if(fileImg){
            img = fileImg.buffer;
            dto = new updateBodyDto(idbody,fecha,ocr,text,img);
        }
        let resultado = await new concreteLogger(this.repoUpdate, this.repoLogger, "body edited").execute(dto);
        if (resultado.isLeft()) {
            return response.status(HttpStatus.FORBIDDEN).json(resultado.getLeft().message);
        }else{
            return response.status(HttpStatus.OK).json(resultado.getRight());
        }
    }

    @Delete(':id')
    async delete(@Param('id') id:string, @Res() response): Promise<string> {
        let idBody = id;
        let dto = new deleteBodyDto(idBody);
        let resultado = await new concreteLogger(this.repoDelete, this.repoLogger, "body deleted").execute(dto);
        if (resultado.isLeft()) {
            return response.status(HttpStatus.FORBIDDEN).json(resultado.getLeft().message);
        }else{
            return response.status(HttpStatus.OK).json(resultado.getRight());
        }
    }





}