import { Body, Controller, Delete, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { CreateTagService } from "../application/createTagService";
import { createTagDto } from "../application/dto/createTagDto";
import { ApiTags,ApiBody } from "@nestjs/swagger";
import { DeleteTagService } from "../application/deleteTagService";
import { UpdateTagService } from "../application/updateTagService";
import { editTagDto } from "../application/dto/editTagDto";
import { adapterTagRepository } from "./adapterTagRepository";
import { adapterDecorator } from "src/core/infrastructure/adapterDecorator";
import { concreteLogger } from "src/core/application/concretLogger";

@ApiTags('Etiquetas')
@Controller('tag')
export class TagController{
    constructor(
      private readonly repoItag: adapterTagRepository, private readonly repoLogger: adapterDecorator,
        private  createRepo: CreateTagService,
        private  deleteRepo: DeleteTagService,
        private  updateRepo: UpdateTagService
    ){
      this.createRepo = new CreateTagService(this.repoItag)
      this.deleteRepo = new DeleteTagService(this.repoItag)
      this.updateRepo = new UpdateTagService(this.repoItag)
    }
    @ApiBody({type: createTagDto})
    @Post()
    async create(@Body() body, @Res() response): Promise<string>{

        let dto = new createTagDto(body.nombre, body.idUsuario);
        let result = await new concreteLogger(this.createRepo, this.repoLogger, "tag created").execute(dto);

        if (result.isLeft()) {
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
          }else{
            return response.status(HttpStatus.OK).json(result.getRight());
          }
    }

    @Delete(':id')
    async remove(@Param('id') id: string,@Res() response) {
      let result = await new concreteLogger(this.deleteRepo, this.repoLogger, "tag deleted").execute(id);

      if (result.isLeft()) {
        
        return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
      }else{
        return response.status(HttpStatus.OK).json(result.getRight());
      }
  }

  @Put(':id')
    async update(@Param('id') id: string, @Body() body, @Res() response): Promise<string>{

        let dto = new editTagDto(id,body.nombre, body.idUsuario, body.notas)
        let result = await new concreteLogger(this.updateRepo, this.repoLogger, "tag edited").execute(dto);

        if (result.isLeft()) {
            return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
          }else{
            return response.status(HttpStatus.OK).json(result.getRight());
          }
    }
}