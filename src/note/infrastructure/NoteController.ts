import { Controller, Get, Post, Body, Put, Patch, Param, Delete, Inject, Req, Res, HttpStatus } from '@nestjs/common';
import { CreateNoteDto } from '../application/dto/CreateNoteDto';
import { createnoteService } from 'src/note/application/createNoteService';
import { adapterNoteRepository } from './adapterNoteRepository';
import { NoteAggregate } from '../domain/noteAggregate';
import { INotes } from '../domain/repository/INotes';
import { Either } from 'src/generics/Either';
import { updatenoteService } from 'src/note/application/updateNoteService';
import { UpdateNoteDto } from '../application/dto/UpdateNoteDto';
import { findNoteDto } from '../application/dto/findNoteDto';
import { findNoteService } from '../application/findNoteService';
import { ApiTags } from '@nestjs/swagger';
//import { UpdateNoteDto } from './dto/update-note.dto';

@ApiTags('Notas')
@Controller('note')
export class NoteController {
  constructor(private readonly repo: createnoteService, private readonly repoUpdate: updatenoteService, private readonly repofind: findNoteService) {}


  @Post()
  async create(@Body() body, @Res() response): Promise<string> {
    let etiquet = body.etiquet;
    let titulo = body.titulo;
    let fechaC = body.fechaC;
    let est = body.est;
    let dto = new CreateNoteDto( etiquet, titulo, fechaC, est);
    let result = await this.repo.execute(dto);
    if (result.isLeft()) {
      return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
    }else{
      return response.status(HttpStatus.OK).json("Nota Creada con Exito");
    }
  }

  @Put(':id')
  async update(@Param('id') id:string, @Body() body, @Req() request): Promise<string> {
    let idNota = id;
    let text = body.text;
    let img = body.img;
    let etiquet = body.etiquet;
    let titulo = body.titulo;
    let fechaC = body.fechaC;
    let est = body.est;
    let dto = new UpdateNoteDto(idNota, etiquet, titulo, fechaC, est);
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


  /*
  @Get()
  findAll() {
    return this.noteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(+id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(+id, updateNoteDto);
  }*/

  
}
