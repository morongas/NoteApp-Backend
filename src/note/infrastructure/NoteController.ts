import { Controller, Get, Post, Body, Put, Patch, Param, Delete, Inject, Req, Res, HttpStatus } from '@nestjs/common';
import { CreateNoteDto } from '../application/dto/CreateNoteDto';
import { createnoteService } from 'src/note/application/createNoteService';
import { adapterNoteRepository } from './adapterNoteRepository';
import { updatenoteService } from 'src/note/application/updateNoteService';
import { UpdateNoteDto } from '../application/dto/UpdateNoteDto';
import { findNoteDto } from '../application/dto/findNoteDto';
import { findNoteService } from '../application/findNoteService';
import { deleteNoteService } from '../application/deleteNoteService';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { deleteNoteDto } from '../application/dto/deleteNoteDto';

@ApiTags('Notas')
@Controller('note')
export class NoteController {
  constructor(private readonly repoInotes: adapterNoteRepository,
              private  repo: createnoteService, 
              private  repoUpdate: updatenoteService, 
              private  repofind: findNoteService, 
              private  repoDelete: deleteNoteService) {
                this.repo = new createnoteService(this.repoInotes);
                this.repoUpdate = new updatenoteService(this.repoInotes);
                this.repofind = new findNoteService(this.repoInotes);
                this.repoDelete = new deleteNoteService(this.repoInotes);
              }

  @ApiBody({type: CreateNoteDto})
  @Post()
  async create(@Body() body, @Res() response): Promise<string> {
    let titulo = body.titulo;
    let fechaC = body.fechaC;
    let est = body.est;
    let desc = body.desc;
    let dto = new CreateNoteDto(titulo,fechaC, est,desc);

    let result = await this.repo.execute(dto);
    if (result.isLeft()) {
      return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
    }else{
      return response.status(HttpStatus.OK).json("Nota Creada con Exito");
    }
  }
  @ApiBody({type: UpdateNoteDto})
  @Put(':id')
  async update(@Param('id') id:string, @Body() body, @Req() request): Promise<string> {
    let idNota = id;
    let titulo = body.titulo;
    let fechaC = body.fechaC;
    let est = body.est;
    let desc = body.desc;
    let dto = new UpdateNoteDto(titulo, idNota,fechaC, est,desc);
    let resultado = await this.repoUpdate.execute(dto);
    if (resultado.isLeft()) {
      return "No se pudo editar la nota: "+resultado.getLeft().message;
    }else{
      return "Nota editada";
    }
  }

  @Get(':id')
  async findById(@Param('id') id:string, @Res() response) {
    let idNota = id;
    let dto = new findNoteDto(idNota);
    let result = await this.repofind.execute(dto);
    if (result.isRight()) {
      return response.status(HttpStatus.OK).json(result.getRight());
    }
    else {
      return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
    }
  }

  @Delete(':id')
    async delete(@Param('id') id:string, @Req() request): Promise<string> {
        let idNote = id;
        let dto = new deleteNoteDto(idNote);
        let resultado = await this.repoDelete.execute(dto);
        if (resultado.isLeft()) {
            return "No se pudo eliminar la nota: "+resultado.getLeft();
        }else{
            return "Nota eliminada";
        }
    }
  
}
