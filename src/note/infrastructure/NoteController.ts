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
import { concreteLogger } from 'src/core/application/concretLogger';
import { adapterDecorator } from 'src/core/infrastructure/adapterDecorator';
import { NoteEntity } from './entities/note_entity';

@ApiTags('Notas')
@Controller('note')
export class NoteController {
  constructor(private readonly repoInotes: adapterNoteRepository, private  readonly repoLogger: adapterDecorator,
              private  repo: createnoteService<NoteEntity>, 
              private  repoUpdate: updatenoteService<NoteEntity>, 
              private  repofind: findNoteService<NoteEntity>, 
              private  repoDelete: deleteNoteService<NoteEntity>) {
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
    let latitud = body.latitud;
    let longitud = body.longitud;
    let descripcionGPS = body.descripcionGPS;
    let est = body.est;
    let desc = body.desc;
    let idUsuario = body.idUsuario
    let dto = new CreateNoteDto(titulo,fechaC,latitud,longitud,descripcionGPS,est,desc,idUsuario);
    let result = await new concreteLogger(this.repo,this.repoLogger,"note created").execute(dto);
    if (result.isLeft()) {
      return response.status(HttpStatus.NOT_FOUND).json(result.getLeft().message);
    }else{
      return response.status(HttpStatus.OK).json(result.getRight());
    }
  }
  @ApiBody({type: UpdateNoteDto})
  @Put(':id')
  async update(@Param('id') id:string, @Body() body, @Res() response): Promise<string> {
    let idNota = id;
    let titulo = body.titulo;
    let fechaC = body.fechaC;
    let est = body.est;
    let desc = body.desc;
    let dto = new UpdateNoteDto(titulo, idNota,fechaC,est,desc);
    let resultado = await new concreteLogger(this.repoUpdate, this.repoLogger, "note edited").execute(dto);
    if (resultado.isLeft()) {
      return response.status(HttpStatus.NOT_FOUND).json(resultado.getLeft().message);
    }else{
      return response.status(HttpStatus.OK).json("Nota Editado con Exito");
    }
  }

  @Get(':id')
  async findById(@Param('id') id:string, @Res() response) {
    let idNota = id;
    let dto = new findNoteDto(idNota);
    let resultado = await new concreteLogger(this.repofind, this.repoLogger, "note finded").execute(dto);
    if (resultado.isRight()) {
      return response.status(HttpStatus.OK).json(resultado.getRight());
    }
    else {
      return response.status(HttpStatus.NOT_FOUND).json(resultado.getLeft().message);
    }
  }

  @Delete(':id')
    async delete(@Param('id') id:string, @Req() request): Promise<string> {
        let idNote = id;
        let dto = new deleteNoteDto(idNote);
        let resultado = await new concreteLogger(this.repoDelete, this.repoLogger, "note deleted").execute(dto);
        if (resultado.isLeft()) {
            return "No se pudo eliminar la nota: "+resultado.getLeft();
        }else{
            return "Nota eliminada";
        }
    }
  
}
