import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { CreateTagService } from "../application/createTagService";
import { createTagDto } from "../application/dto/createTagDto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Etiquetas')
@Controller('tag')
export class TagController{
    constructor(
        private readonly createRepo: CreateTagService
    ){}

    @Post()
    async create(@Body() body, @Res() response): Promise<string>{

        let dto = new createTagDto(body.nombre, body.idUsuario)
        let result = await this.createRepo.execute(dto);
        if (result.isLeft()) {
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
          }else{
            return response.status(HttpStatus.OK).json("Etiqueta creada con Exito");
          }
    }
}