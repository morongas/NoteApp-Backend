import { Body, Controller, Delete, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { CreateTagService } from "../application/createTagService";
import { createTagDto } from "../application/dto/createTagDto";
import { ApiTags } from "@nestjs/swagger";
import { DeleteTagService } from "../application/deleteTagService";

@ApiTags('Etiquetas')
@Controller('tag')
export class TagController{
    constructor(
        private readonly createRepo: CreateTagService,
        private readonly deleteRepo: DeleteTagService
    ){}

    @Post()
    async create(@Body() body, @Res() response): Promise<string>{

        let dto = new createTagDto(body.nombre, body.idUsuario)
        let result = await this.createRepo.execute(dto);
        if (result.isLeft()) {
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
          }else{
            return response.status(HttpStatus.OK).json(result.getRight());
          }
    }

    @Delete(':id')
    async remove(@Param('id') id: string,@Res() response) {
      let result = await this.deleteRepo.execute(id)
      if (result.isLeft()) {
        
        return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
      }else{
        return response.status(HttpStatus.OK).json(result.getRight());
      }
    }
}