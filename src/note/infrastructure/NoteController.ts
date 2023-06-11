import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { CreateNoteDto } from './dto/CreateNoteDto';
import { adapterNoteRepository } from './adapterNoteRepository';
import { NoteAggregate } from '../domain/noteAggregate';
//import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('note')
export class NoteController {
  constructor(@Inject(adapterNoteRepository) private readonly noteService: adapterNoteRepository) {}

  @Post()
  create(@Body() createNoteDto: NoteAggregate) {
    return this.noteService.saveNota(createNoteDto);
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
