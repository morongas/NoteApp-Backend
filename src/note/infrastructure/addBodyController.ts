import { Body, Controller, Param, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { addBodyToNoteService } from "../application/addBodyToNoteService";
import { addBodyDto } from "../application/dto/addBodyDto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiExcludeController } from "@nestjs/swagger";

@ApiExcludeController()
@Controller('body')
export class addBodyController {
    constructor(private readonly repo: addBodyToNoteService) {}

    @Post(':id')
    @UseInterceptors(FileInterceptor('file'))
    async create(@Param('id') id: string,@Body() body?, @Req() request?, @UploadedFile() fileImg?: Express.Multer.File): Promise<string> {
        let idNota = id;
        let text = body.text;
        let img ;
        let dto: addBodyDto;
        if(fileImg===undefined){
            console.log("no hay imagen");
            console.log(fileImg);
            dto = new addBodyDto(idNota, text);
        }
        if(fileImg){
            img = fileImg.buffer;
            dto = new addBodyDto(idNota, text, img);
        }
        console.log(dto);
        let resultado = await this.repo.execute(dto);
        if (resultado.isLeft()) {
            return "No se pudo crear el body: "+resultado.getLeft().message;
        }else{
            return "Body creado";
        }
    }
}